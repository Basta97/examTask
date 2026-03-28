export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginResponse {
  message: string;
  token: string;
  email: string;
}

export interface RegisterUser extends User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface LoginUser extends User {
  username: string;
  password: string;
}

export interface VerifyEmail extends User {
  email: string;
}

export interface ConfirmEmailVerification extends User {
  email: string;
  code: string;
}
