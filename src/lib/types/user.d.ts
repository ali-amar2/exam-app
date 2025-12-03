declare type User = {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "user";
    isVerified: boolean;
    createdAt: string;
};
