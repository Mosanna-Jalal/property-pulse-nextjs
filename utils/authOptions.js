import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
        // 1. Connect to DB
        await connectDB();
        // 2. Check if user exists
        const userExists = await User.findOne({ email: profile.email });
        // 3. If not, create user
        if (!userExists) {
          // Truncate name if too long
          const username = profile.name.slice(0, 20);

          await User.create({
            email: profile.email,
            username,
            image: profile.picture,
          });
        }
        // 4. Return true to allow sign in
        return true;
    },
    async jwt({ token }) {
      if (!token.userId && token.email) {
        await connectDB();
        const user = await User.findOne({ email: token.email }).select("_id");
        if (user?._id) {
          token.userId = user._id.toString();
        }
      }

      return token;
    },
    // Session callback function that modifies the session object
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId;
      }

        return session;
    },
  },
};
