import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../prisma/prisma";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID,
            clientSecret: process.env.TWITTER_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = user.id;
            session.user.role = user.role;
            return session;
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
    },
    events: {
        async signIn({ user, isNewUser }) {
            if (isNewUser) {
                await prisma.Reviewer.create({
                    data: {
                        user: { connect: { id: user.id } },
                    },
                });
                await prisma.User.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        full_name: user.name,
                    },
                });
            }
        },
    },
};

export default NextAuth(authOptions);
