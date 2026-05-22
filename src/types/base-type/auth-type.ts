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
