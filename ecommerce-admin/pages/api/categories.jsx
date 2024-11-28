import { isAdminRequest } from "@/pages/middleware/isAdmin";
import { Category } from "@/models/Category";
import connectDB from "@/lib/mongoose";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    // Verify admin privileges
    await isAdminRequest(req, res);

    // Connect to the database only if it's not already connected
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
    parentCategory: parentCategory || undefined,
    properties,
  });

  res.status(201).json(category);
}

async function handleUpdateCategory(req, res) {
  const { id, name, parentCategory, properties } = req.body;

  if (!id) {
    throw new Error("Category ID is required for updates");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { name, parentCategory, properties },
    { new: true } // Return the updated document
  );

  if (!updatedCategory) {
    throw new Error("Category not found");
  }

  res.status(200).json(updatedCategory);
}

async function handleGetCategories(req, res) {
  const categories = await Category.find().populate("parentCategory");
  res.status(200).json(categories);
}

async function handleDeleteCategory(req, res) {
  const { id } = req.query;

  if (!id) {
    throw new Error("Category ID is required for deletion");
  }

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new Error("Category not found");
  }

  res.status(200).json(deletedCategory);
}
