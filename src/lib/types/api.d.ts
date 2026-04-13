import { User } from "./user";

declare type DatabaseProperties = {
  _id: string;
  createdAt: string;
  updatedAt?: string;
  passwordChangedAt?: string;
};

declare type SuccessResponse = {
  status: boolean;
  message: string;
  token: string;
  user: User;
};

declare type ErrorResponse = {
  status: boolean;
  message: string;
  code: number;
};

declare type ApiResponse = SuccessResponse | ErrorResponse;
