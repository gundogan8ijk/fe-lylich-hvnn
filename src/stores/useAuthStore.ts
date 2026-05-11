import { create } from 'zustand';
import { Role, User } from '../types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  hasRole: (allowedRoles: Role[]) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  hasRole: (allowedRoles) => {
    const user = get().user;
    if (!user || !user.roles) return false;
    return user.roles.some((role) => allowedRoles.includes(role));
  },
}));