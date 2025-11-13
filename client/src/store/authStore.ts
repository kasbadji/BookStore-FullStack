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
  register: (name: string, email: string, password: string) => Promise<void>;
  loadUser: () => Promise<void>;
  init: () => Promise<void>;
  initializing: boolean;
  setInitializing: (value: boolean) => void;
  logout: () => void;
}

const getBrowserToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: getBrowserToken(),
  loading: false,
  initializing: true,

  setToken: (token: string | null) => {
    if (typeof window !== 'undefined') {
      try {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
      } catch {
        // ignore localStorage errors
      }
    }
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
    set({ token });
  },

  setInitializing: (value: boolean) => set({ initializing: value }),

  login: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await api.post<LoginResponse>('/auth/login', { email, password });
      const { token, user } = response.data;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('token', token);
        } catch {}
      }
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user, token, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      const axiosError = error as { response?: { data?: { message?: string } } };
      console.log('Login failed:', axiosError.response?.data);
      throw new Error(axiosError.response?.data?.message || 'Login failed');
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await api.post<LoginResponse>('/auth/register', { name, email, password });
      const { token, user } = response.data;
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('token', token);
        } catch {}
      }
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ token, user, loading: false });
    } catch (error: unknown) {
      set({ loading: false });
      const axiosError = error as { response?: { data?: { message?: string } } };
      console.log('Registration failed:', axiosError.response?.data);
      throw new Error(axiosError.response?.data?.message || 'Registration failed');
    }
  },

  loadUser: async () => {
    set({ loading: true });
    try {
      const res = await api.get<{ user: User }>('/auth/me');
      set({ user: res.data.user, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  // initialize store: set axios header from localStorage and try to load current user
  init: async () => {
    const token = getBrowserToken();
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const res = await api.get<{ user: User }>('/auth/me');
        set({ user: res.data.user, token, initializing: false });
      } catch {
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('token');
          } catch {}
        }
        delete api.defaults.headers.common['Authorization'];
        set({ user: null, token: null, initializing: false });
      }
    } else {
      set({ initializing: false });
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('token');
      } catch {}
    }
    delete api.defaults.headers.common['Authorization'];
    set({ user: null, token: null, loading: false });
  }
}));

//! This store tracks: user data, token, login function, logout function

