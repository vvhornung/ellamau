import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import { Admin } from "@/models/Admin";
import connectDB from "@/lib/mongoose";

export const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();
        const adminCount = await Admin.countDocuments();

        if (adminCount === 0) {
          // Automatically make the first user a super-admin
          await Admin.create({ email: user.email, role: "super-admin" });
          return true;
        }

        const admin = await Admin.findOne({ email: user.email });
        return !!admin; // Allow only existing admins
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Prevent sign-in on errors
      }
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          await connectDB();
          const admin = await Admin.findOne({ email: user.email });
          token.isAdmin = !!admin;
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.isAdmin !== undefined) {
        session.user.isAdmin = token.isAdmin;
      } else {
        session.user.isAdmin = false;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
