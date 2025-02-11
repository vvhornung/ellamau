import { isAdminRequest } from "@/pages/middleware/isAdmin";
import { Category } from "@/models/Category";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    // Verify admin privileges
    await isAdminRequest(req, res);

    // Connect to the database if it's not already connected
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const { method } = req;

    switch (method) {
      case "POST":
        await handleCreateCategory(req, res);
        break;
      case "PUT":
        await handleUpdateCategory(req, res);
        break;
      case "GET":
        await handleGetCategories(req, res);
        break;
      case "DELETE":
        await handleDeleteCategory(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error("API Error:", error.message);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    }
  }
}

// CRUD Operations

async function handleCreateCategory(req, res) {
  const { name, parentCategory, properties } = req.body;

  if (!name) {
    throw new Error("Category name is required");
  }

  const category = await Category.create({
    name,
    parentCategory: parentCategory || null,
    properties,
  });

  // ✅ If there's a parent category, update its `children` array
  if (parentCategory) {
    await Category.findByIdAndUpdate(parentCategory, {
      $addToSet: { children: category._id },
    });
  }

  res.status(201).json(category);
}

async function handleUpdateCategory(req, res) {
  const { id, name, parentCategory, properties } = req.body;

  if (!id) {
    throw new Error("Category ID is required for updates");
  }

  const oldCategory = await Category.findById(id);
  if (!oldCategory) {
    throw new Error("Category not found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, parentCategory: parentCategory || null, properties },
    { new: true }
  );

  // ✅ If parent changed, update `children` arrays
  if (oldCategory.parentCategory?.toString() !== parentCategory?.toString()) {
    // Remove from old parent
    if (oldCategory.parentCategory) {
      await Category.findByIdAndUpdate(oldCategory.parentCategory, {
        $pull: { children: id },
      });
    }

    // Add to new parent
    if (parentCategory) {
      await Category.findByIdAndUpdate(parentCategory, {
        $addToSet: { children: id },
      });
    }
  }

  res.status(200).json(updatedCategory);
}

async function handleGetCategories(req, res) {
  const { id, parent } = req.query;

  try {
    if (id) {
      // Single category fetch with complete hierarchy
      const category = await Category.findById(id)
        .populate({
          path: "parentCategory",
          select: "_id name",
        })
        .populate({
          path: "children",
          select: "_id name children",
          populate: {
            path: "children",
            select: "_id name",
          },
        })
        .lean();

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      return res.status(200).json(category);
    }

    if (parent) {
      // Fetch direct children of a parent category
      const categories = await Category.find({ parentCategory: parent })
        .populate({
          path: "parentCategory",
          select: "_id name",
        })
        .populate({
          path: "children",
          select: "_id name children",
          populate: {
            path: "children",
            select: "_id name",
          },
        })
        .lean();

      return res.status(200).json(categories);
    }

    // Fetch all categories with optimized hierarchy
    const categories = await Category.aggregate([
      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "children",
          connectToField: "_id",
          as: "descendents",
          maxDepth: 10,
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "parentCategory",
          foreignField: "_id",
          as: "parentCategory",
        },
      },
      {
        $addFields: {
          parentCategory: { $arrayElemAt: ["$parentCategory", 0] },
          childCount: { $size: "$children" },
          descendentCount: { $size: "$descendents" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          children: 1,
          childCount: 1,
          descendentCount: 1,
          "parentCategory._id": 1,
          "parentCategory.name": 1,
        },
      },
      {
        $sort: {
          "parentCategory._id": 1,
          name: 1,
        },
      },
    ]);

    return res.status(200).json(categories);
  } catch (error) {
    console.error("Category fetch error:", error);
    return res.status(500).json({
      error: "Failed to fetch categories",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

async function handleDeleteCategory(req, res) {
  const { id } = req.query;

  if (!id) {
    throw new Error("Category ID is required for deletion");
  }

  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }

  // ✅ Remove from parent category's children array
  if (category.parentCategory) {
    await Category.findByIdAndUpdate(category.parentCategory, {
      $pull: { children: id },
    });
  }

  // ✅ Reassign child categories to the parent (or set them as top-level)
  await Category.updateMany(
    { parentCategory: id },
    { $set: { parentCategory: category.parentCategory || null } }
  );

  // ✅ Finally, delete the category
  const deletedCategory = await Category.findByIdAndDelete(id);
  res.status(200).json(deletedCategory);
}
