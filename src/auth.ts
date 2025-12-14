import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiResponse } from "./lib/types/api";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },

            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const payload: ApiResponse = await response.json();

                if ("code" in payload) {
                    throw new Error(payload.message);
                }

                return {
                    _id: payload.user._id,
                    accesstoken: payload.token,
                    ...payload.user,
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token = { ...token, ...user };
            }
            if (trigger === "update" && session) {
                token = {
                    ...token,
                    ...session,
                };
            }

            return token;
        },

        session: ({ session, token }) => {
            session.user._id = token._id;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            session.user.username = token.username;
            session.user.email = token.email || "";
            session.user.phone = token.phone;
            session.user.role = token.role;
            session.user.isVerified = token.isVerified;
            session.user.createdAt = token.createdAt;
            return session;
        }
    },
};
