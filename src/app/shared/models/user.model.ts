export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  role: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
  userStatus: UserStatus;
  userRole: UserRole;
  createdAt: string;
  updatedAt: string | null;
}

export interface UserApiResponse<T> {
  data: {
    data: {
      data: T[];
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
    success: boolean;
    message: string;
    errors: string[];
  };
  success: boolean;
  message: string;
  errors: string[];
}

export enum UserRole {
  Admin = 'Admin',
  Common = 'Common'
}

export enum UserStatus {
  Active = 'Active',
  Inactive = 'Inactive'
}

export interface CreateUserRequest {
  username: string;
  password: string;
  phone: string;
  email: string;
  status: UserStatus;
  role: UserRole;
}

export interface UpdateUserRequest {
  username: string;
  email: string;
  phone?: string;
  password?: string;
  userStatus: UserStatus;
  userRole: UserRole;
}