import prisma from "@/lib/prisma";
import { Redis } from "@upstash/redis";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type User = {
  id: string,
  email: string,
  username: string
}



export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
          access_type: 'offline',
          prompt: 'consent',
        }
      },
    })
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "email", },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials: any, req: any) {
    //     try {
    //       if (credentials?.username === "" || credentials?.password === "") throw new Error("Username or Password is empty");

    //       const redis = new Redis({
    //         url: process.env.REDIS_URL as string,
    //         token: process.env.REDIS_TOKEN as string,
    //       })

    //       const users: User[] | null = await redis.get("admin");

    //       const user = users?.find(user => user.email === credentials.username);

    //       if (user) {
    //         return user
    //       } else {
    //         return null
    //       }
    //     } catch (error: any) {
    //       throw new Error(error.message);
    //     }
    //   }
    // })
  ],
  callbacks: {

  },
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'light' as const,
  },
  events: {
    createUser: async ({ user }) => {
      const { email, image, name } = user;
      await prisma.user.create({
        data: {
          email: email as string,
          name: name as string,
          image: image ?? null,
        },
      });
    },
    signIn: async ({ user }) => {
      const { email, image, name } = user;

      await prisma.user.upsert({
        where: {
          email: email as string,
        },
        update: {
          name: name as string,
          image: image ?? null,
        },
        create: {
          email: email as string,
          name: name as string,
          image: image ?? null,
        },
      });
    },
  },


}