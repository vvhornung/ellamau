import { Product } from "@/models/Product";
import connectDB from "@/lib/mongoose";

export default async function handler(req, res) {
  await connectDB(); // Ensures database connection is ready

  const { method } = req;

  if (method === "POST") {
    const { name, description, price, images } = req.body;
    try {
      const product = await Product.create({
        name,
        description,
        price,
        images,
      });
      res.status(201).json({ success: true, data: product });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === "GET") {
    try {
      if (req.query.id) {
        const product = await Product.findById(req.query.id);
        res.status(200).json({ success: true, data: product });
      } else {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
      }
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === "PUT") {
    const { name, description, price, images } = req.body;
    try {
      const product = await Product.findByIdAndUpdate(
        req.query.id,
        { name, description, price, images },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === "DELETE") {
    try {
      const product = await Product.findByIdAndDelete(req.query.id);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
