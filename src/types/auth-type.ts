export enum Role {
  ADMIN = "ADMIN",
  LECTURER = "LECTURER",
  MANAGER = "MANAGER",
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