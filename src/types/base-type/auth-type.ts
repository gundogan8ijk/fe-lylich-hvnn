export enum Role {
  ADMIN = "Admin",
  LECTURER = "Lecturer",
  MANAGER = "Management",
  VERIFIED = "VERIFIED",
}

export interface ProtectedRoute {
  prefix: string;
  roles: Role[];
}

export interface User {
  id: string;
  roles: Role[];
}

export interface AuthUser {
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  expiresIn: number;
  userId: string;
  roles: string[];
}
