import { Admin } from "@/models/Admin";
import connectDB from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/middleware/isAdmin";

export default async function handler(req, res) {
  await connectDB(); // Ensure the database is connected
  const { method } = req;

  try {
    // Verify the user is an admin
    await isAdminRequest(req, res);

    switch (method) {
      case "GET":
        const admins = await Admin.find();
        res.status(200).json(admins);
        break;

      case "POST":
        const { email } = req.body;
        if (!email) {
          return res.status(400).json({ error: "Email is required" });
        }
        const newAdmin = await Admin.create({ email });
        res.status(201).json(newAdmin);
        break;

      case "DELETE":
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "Admin ID is required" });
        }
        await Admin.findByIdAndDelete(id);
        res.status(200).json({ message: "Admin removed successfully" });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
