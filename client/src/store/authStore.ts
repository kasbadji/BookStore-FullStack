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
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

interface AuthState {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, name: string, password: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,

    login: async (email: string, password: string) => {
        const response = await api.post<LoginResponse>('/auth/login', { email, password });

        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem('token', token);

        set({ user, token });
    },

    register: async (email, name, password) => {
        const response = await api.post<LoginResponse>("/auth/register", {
            name, email, password,
        });

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        set({ token, user });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
}));


//!This store tracks: user data, token, login function, logout function

