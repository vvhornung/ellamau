import { isAdminRequest } from "@/pages/middleware/isAdmin";
import { Product } from "@/models/Product";
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
        await handleCreateProduct(req, res);
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
  const { name, category, description, price, images, properties } = req.body;

  if (!name || !price || !category) {
    throw new Error("Name, price, and category are required fields.");
  }

  const product = await Product.create({
    name,
    category,
    description,
    price,
    images,
    properties,
  });

  res.status(201).json({ success: true, data: product });
}

async function handleUpdateProduct(req, res) {
  const { id, name, category, description, price, images, properties } =
    req.body;

  if (!id) {
    throw new Error("Product ID is required for updates.");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, category, description, price, images, properties },
    { new: true, runValidators: true } // Return the updated document and validate inputs
  );

  if (!updatedProduct) {
    throw new Error("Product not found.");
  }

  res.status(200).json({ success: true, data: updatedProduct });
}

async function handleGetProducts(req, res) {
  if (req.query.id) {
    const product = await Product.findById(req.query.id);

    if (!product) {
      throw new Error("Product not found.");
    }

    return res.status(200).json({ success: true, data: product });
  }

  const products = await Product.find();
  res.status(200).json({ success: true, data: products });
}

async function handleDeleteProduct(req, res) {
  const { id } = req.query;

  if (!id) {
    throw new Error("Product ID is required for deletion.");
  }

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new Error("Product not found.");
  }

  res.status(200).json({ success: true, data: {} });
}
