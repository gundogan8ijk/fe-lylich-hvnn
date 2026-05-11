import { Role } from "@/types/auth";

export const hasRequiredRole = (userRoles: Role[], allowedRoles: Role[]) => {
  return userRoles.some(role => allowedRoles.includes(role));
};