import { User } from "./user";

declare type DatabaseProperties = {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  passwordChangedAt?: string;
};

declare type SuccessResponse = {
  message: "success";
  token: string;
  user: User;
};

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type ApiResponse = SuccessResponse | ErrorResponse;
