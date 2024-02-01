import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { ExtendedSession } from "@/types";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }: {session: ExtendedSession}) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });

      if (sessionUser && session?.user) {
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExist = await User.findOne({
          email: profile?.email,
        });
        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.image,
            savedPosts: [],
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
