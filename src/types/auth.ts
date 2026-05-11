export type Role = 'PUBLIC' | 'ADMIN' | 'LECTURER' | 'MANAGER';

export interface User {
  id: string;
  name: string;
  roles: Role[];
}