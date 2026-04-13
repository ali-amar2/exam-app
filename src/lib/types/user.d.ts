export type User = {
  id: string;
  token: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  role: "USER";
  profilePhoto: string;
  emailVerified: boolean | Date | null;
  phoneVerified: boolean;
  createdAt?: string;
};
export type AccountUser = {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  id: string;
  username: string;
  email: string;
  phone: string;
};

export type DeleteAccountResponse = {
  message: string;
};
