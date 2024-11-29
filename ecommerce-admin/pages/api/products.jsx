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
        if (req.body.products) {
          // Handle bulk creation if products array is provided
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

// Single product creation
async function handleCreateProduct(req, res) {
  const {
    name,
    reference,
    category,
    description,
    details,
    price,
    images,
    properties,
  } = req.body;

  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ error: "Name, reference, price, and category are required." });
  }

  const product = await Product.create({
    name,
    reference,
    category,
    description,
    details,
    price,
    images,
    properties,
  });

  res.status(201).json({ success: true, data: product });
}

// Bulk product creation
async function handleBulkCreateProducts(req, res) {
  const { products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({ error: "Products array is required and cannot be empty." });
  }

  try {
    const result = await Product.insertMany(products); // Ignore errors for individual products
    res
      .status(201)
      .json({ success: true, message: `${result.length} products added.` });
  } catch (error) {
    console.error("Bulk upload error:", error);
    res.status(500).json({ error: "An error occurred during bulk upload." });
  }
}

// Product update
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
    properties,
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
      properties,
    },
    { new: true, runValidators: true } // Return the updated document and validate inputs
  );

  if (!updatedProduct) {
    return res.status(404).json({ error: "Product not found." });
  }

  res.status(200).json({ success: true, data: updatedProduct });
}

// Retrieve products
async function handleGetProducts(req, res) {
  if (req.query.id) {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.status(200).json({ success: true, data: product });
  }

  const products = await Product.find();
  res.status(200).json({ success: true, data: products });
}

// Product deletion
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
