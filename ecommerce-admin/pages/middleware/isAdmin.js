import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Admin } from "@/models/Admin";
import connectDB from "@/lib/mongoose";

export async function isAdminRequest(req, res) {
  await connectDB(); // Ensure the database is connected
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user.email) {
    res.status(403).json({ error: "Access denied: Admins only." });
    throw new Error("Access denied");
  }

  const admin = await Admin.findOne({ email: session.user.email });
  if (!admin) {
    res.status(403).json({ error: "Access denied: Admins only." });
    throw new Error("Access denied");
  }
}
