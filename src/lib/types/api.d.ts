import { User } from "./user";

declare type SuccessResponse = {
    message: "success";
    token: string;
    user: User;
}

declare type ErrorResponse = {
    message: string;
    code: number;
}

declare type ApiResponse = SuccessResponse | ErrorResponse;