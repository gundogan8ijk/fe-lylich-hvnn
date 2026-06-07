export enum Role {
  ADMIN = "Admin",
  LECTURER = "Lecturer",
  MANAGER = "Management",
}

export interface ProtectedRoute {
  prefix: string;
  roles: Role[];
}

export interface TimeToken {
  AccessTokenExpiry: string;
  RefreshTokenExpiry: string;
  expiresIn: number;
}

export type ChangePasswordForm = Record<string, unknown>;
export type ResetPasswordForm = Record<string, unknown>;
export type RegisterLecturerForm = Record<string, unknown>;