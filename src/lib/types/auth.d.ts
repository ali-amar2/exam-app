import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    role: string;
    profilePhoto?: string;
    emailVerified?: boolean | Date | null;
    phoneVerified: boolean;
    createdAt?: string;
    accesstoken: string;
  }

  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      profilePhoto?: string;
      email: string;
      phone: string;
      role: string;
      emailVerified?: boolean | Date | null;
      phoneVerified: boolean;
      createdAt?: string;
      accesstoken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string | null;
    phone?: string;
    role?: string;
    profilePhoto?: string;
    emailVerified?: boolean | Date | null;
    phoneVerified?: boolean;
    createdAt?: string;
    accesstoken?: string;
  }
}
