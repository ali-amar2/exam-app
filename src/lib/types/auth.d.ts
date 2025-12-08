import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            _id: string;
            firstName: string;
            lastName: string;
            username: string;
            email: string;
            phone: string;
            role: string;
            isVerified: boolean;
            createdAt: string;
            accesstoken: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        email: string | null;
        phone: string;
        role: string;
        isVerified: boolean;
        createdAt: string;
        accesstoken: string;
    }
}

export type ResetPasswordPayload = {
    email: string;
    newPassword: string;
};