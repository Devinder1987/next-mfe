import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Login = {
  status: boolean;
  username?: string; // Optional, can be used to store the username after login
  isLoading: boolean;
  error: string | null;
};

type LoginState = {
  login: Login;
  setLoginStatus: (status: boolean, username?: string) => void;
  callLogin: () => void;
  logout: () => void;
};

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      login: {
        status: false,
        isLoading: false,
        error: null,
      },
      setLoginStatus: (status, username) =>
        set({ login: { status, username, isLoading: false, error: null } }),
      callLogin: () =>
        set({ login: { status: false, isLoading: true, error: null } }),
      logout: () =>
        set({ login: { status: false, isLoading: false, error: null } }),
    }),
    {
      name: 'login-store', // Key in localStorage
    }
  )
);
