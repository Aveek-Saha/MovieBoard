import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma";
import Role from "@prisma/client"

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
      async session({ session, token, user }) {
        session.user.id = user.id;
        session.user.role = user.role;
        return session;
      },
    },
};

export default NextAuth(authOptions);
