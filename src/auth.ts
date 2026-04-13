import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.API}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          const data = await res.json();

          if (!res.ok || data.status === false) {
            throw new Error(data.message || "Login failed");
          }

          const user = data.payload.user;
          const token = data.payload.token;

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phone: user.phone,
            role: user.role,
            emailVerified: user.emailVerified,
            phoneVerified: user.phoneVerified,
            accesstoken: token,
          };
        } catch (error: any) {
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      // update session
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          ...session.user,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        username: token.username as string,
        email: token.email as string,
        phone: token.phone as string,
        role: token.role as string,
        emailVerified: token.emailVerified,
        phoneVerified: token.phoneVerified as boolean,
        accesstoken: token.accesstoken as string,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
