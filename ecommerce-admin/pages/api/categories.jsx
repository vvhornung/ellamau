import { Category } from "@/models/Category";
import connectDB from "@/lib/mongoose";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  if (method === "POST") {
    const { name, parentCategory } = req.body;

    try {
      const category = await Category.create({ name, parentCategory });
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else if (method === "PUT") {
    const { id, name, parentCategory } = req.body;
    console.log(req.body)

    try {
      if (!id) {
        return res
          .status(400)
          .json({ error: "Category ID is required for updates." });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name, parentCategory },
        { new: true } // Return the updated document
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found." });
      }

      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  } else if (method === "GET") {
    try {
      const categories = await Category.find().populate("parentCategory");
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).json({ error: `Method ${method} not allowed` });
  }
}
