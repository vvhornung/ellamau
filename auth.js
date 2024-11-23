import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";

const nextAuthConfig = {
  adapter: MongoDBAdapter(client),
  providers: [],
};

const handlers = NextAuth(nextAuthConfig);

export const { auth, signIn, signOut } = handlers;

export default handlers;
