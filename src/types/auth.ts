export type Role = 'PUBLIC' | 'ADMIN' | 'LECTURER' | 'MANAGER';

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