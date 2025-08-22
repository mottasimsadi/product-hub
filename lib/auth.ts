import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUsersCollection } from "./mongodb"; // Removed unused User import
import bcrypt from "bcryptjs";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const usersCollection = await getUsersCollection();
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user || !user.passwordHash) {
          return null;
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user._id.toString(), // Convert ObjectId to string
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session?.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};