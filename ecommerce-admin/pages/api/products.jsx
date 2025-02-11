import { isAdminRequest } from "@/pages/middleware/isAdmin";
import { Product } from "@/models/Product";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    // Verify admin privileges
    await isAdminRequest(req, res);

    // Connect to the database if not already connected
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    const { method } = req;

    switch (method) {
      case "POST":
        if (req.body.products) {
          await handleBulkCreateProducts(req, res);
        } else {
          await handleCreateProduct(req, res);
        }
        break;
      case "PUT":
        await handleUpdateProduct(req, res);
        break;
      case "GET":
        await handleGetProducts(req, res);
        break;
      case "DELETE":
        await handleDeleteProduct(req, res);
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

async function handleCreateProduct(req, res) {
  const {
    name,
    reference,
    category,
    description,
    price,
    stock,
    variants,
    details,
    images,
  } = req.body;

  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ error: "Name, price, and category are required." });
  }

  const product = await Product.create({
    name,
    reference,
    category,
    description,
    details,
    price,
    images,
    stock,
    variants: variants || [], // Ensure an empty array if no variants
  });

  res.status(201).json({ success: true, data: product });
}

async function handleBulkCreateProducts(req, res) {
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Products array is required and cannot be empty." });
  }

  try {
    const result = await Product.insertMany(products);
    res
      .status(201)
      .json({ success: true, message: `${result.length} products added.` });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ error: "An error occurred during bulk upload." });
  }
}

async function handleUpdateProduct(req, res) {
  const {
    id,
    name,
    reference,
    category,
    description,
    details,
    price,
    images,
    stock,
    variants,
  } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ error: "Product ID is required for updates." });
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      name,
      reference,
      category,
      description,
      details,
      price,
      images,
      stock,
      variants: variants || [],
    },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ error: "Product not found." });
  }

  res.status(200).json({ success: true, data: updatedProduct });
}

async function handleGetProducts(req, res) {
  const { id, category, page = 1, limit = 50, search } = req.query;

  try {
    // Single product fetch with complete data
    if (id) {
      const product = await Product.findById(id)
        .select(
          "name price stock variants category reference description details images"
        )
        .populate("category", "_id name")
        .lean();

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json({ success: true, data: product });
    }

    // Build query
    let query = {};

    // Add text search if provided
    if (search) {
      query.$text = { $search: search };
    }

    // Add category filter with descendants
    if (category) {
      const categoryIds = await getCategoryAndDescendants(category);
      query.category = { $in: categoryIds };
    }

    // Calculate pagination
    const skip = (page - 1) * parseInt(limit);

    // Execute query with pagination
    const [products, total] = await Promise.all([
      Product.find(query)
        .select("name price stock variants category reference images")
        .populate("category", "_id name")
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Optimized category descendant lookup
async function getCategoryAndDescendants(categoryId) {
  const results = await Category.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(categoryId) } },
    {
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "children",
        connectToField: "_id",
        as: "descendants",
      },
    },
    {
      $project: {
        allCategories: {
          $concatArrays: [["$_id"], "$descendants._id"],
        },
      },
    },
  ]);

  return results[0]?.allCategories || [categoryId];
}

async function handleDeleteProduct(req, res) {
  const { id } = req.query;
  const { ids } = req.body;

  if (ids) {
    const deletedProducts = await Product.deleteMany({ _id: { $in: ids } });

    if (deletedProducts.deletedCount === 0) {
      return res.status(404).json({ error: "No matching products found." });
    }

    return res
      .status(200)
      .json({ success: true, message: "Products deleted." });
  }

  if (!id) {
    return res
      .status(400)
      .json({ error: "Product ID is required for deletion." });
  }

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.status(404).json({ error: "Product not found." });
  }

  res.status(200).json({ success: true, message: "Product deleted." });
}
