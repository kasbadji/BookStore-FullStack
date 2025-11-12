import { create } from 'zustand';
import { api } from '../lib/axios';

type User = {
    id: string;
    name: string;
    email: string;
    role: string;
};

type LoginResponse = {
  token: string;
  user: User;
};

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  loadUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    loading: true,
    setToken: (token: string | null) => set({ token }),

    login: async (email: string, password: string) => {
        try {
            const response = await api.post<LoginResponse>('/auth/login', { email, password });

          const { token, user } = response.data;

            localStorage.setItem('token', token);

            set({ user, token , loading: false });
        } catch (error: unknown) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            console.log("Login failed:", axiosError.response?.data);
            throw new Error(axiosError.response?.data?.message || "Login failed");
        }
    },

    register: async (name: string, email: string, password: string) => {
        try {
            const response = await api.post<LoginResponse>("/auth/register", {
            name,
            email,
            password,
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            set({ token, user });
        }
        catch (error: unknown) {
            const axiosError = error as { response?: { data?: { message?: string } } };

            console.log("Registration failed:", axiosError.response?.data);
            throw new Error(axiosError.response?.data?.message || "Registration failed");
        }
    },

    loadUser: async () => {
    const token = get().token;
    if (!token) {
      set({ loading: false });
      return;
    }

    try {
      const res = await api.get<{ user: User }>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: res.data.user , loading: false });
    } catch {
      localStorage.removeItem("token");
      set({ user: null, token: null, loading: false });
    }
  },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null , loading: false });
    },
}));


//!This store tracks: user data, token, login function, logout function

