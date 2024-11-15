import { create } from 'zustand';
import { User } from '../types';
import { demoUsers } from './demoUsers';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    const user = demoUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      set({ user: userWithoutPassword, isAuthenticated: true });
      return true;
    }
    return false;
  },
  register: async (name: string, email: string, password: string) => {
    if (demoUsers.some((u) => u.email === email)) {
      return false;
    }
    const newUser = {
      id: String(demoUsers.length + 1),
      name,
      email,
      password,
      role: 'user' as const,
      compensationLink: `https://example.com/compensation/user${demoUsers.length + 1}`,
    };
    demoUsers.push(newUser);
    return true;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));