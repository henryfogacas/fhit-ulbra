export interface IUser {
  id: number;
  publicId: string;
  email: string;
  name: string;
  password: string;
  termsAccepted: boolean;
  termsAcceptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface IUserResponse {
  publicId: string;
  email: string;
  name: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}
