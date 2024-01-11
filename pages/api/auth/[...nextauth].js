import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  // session: { strategy: "jwt" },

  // callbacks: {
  //   async session({ session, token, user }) {
  //     session.jwt = token.jwt;
  //     session.id = token.id;
  //     return session;
  //   },

  //   async jwt({ token, user, account }) {
  //     const isSignIn = user ? true : false;
  //     if (isSignIn) {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/auth/${account?.provider}/callback?access_token=${account?.access_token}`
  //       );
  //       const data = await response.json();
  //       token.jwt = data.jwt;
  //       token.id = data.user.id;
  //     }
  //     return token;
  //   },
  // },
};
export default NextAuth(authOptions);
