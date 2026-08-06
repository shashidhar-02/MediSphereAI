import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * User Entity Model
 * Represents the authenticated user profile stored in global state.
 */
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  roles: string[];
}

/**
 * AuthState Interface
 * Encapsulates client authentication token, user metadata, and action dispatchers.
 */
export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

/**
 * Zustand Global Authentication Store
 * 
 * Provides persistent authentication state management backed by localStorage.
 * Integrates seamlessly with Axios request/response interceptors (`lib/api.ts`).
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token: string, user: User) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'medisphere-auth-storage', // Key used for localStorage persistence
    }
  )
);

