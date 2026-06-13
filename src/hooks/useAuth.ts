import { useState, useCallback } from 'react';
import api from '../lib/axios';
import { useAuthStore } from '../stores/authStore';
import type { LoginPayload, RegisterPayload, AuthResponse, User } from '../types/auth';
import type { ApiResponse } from '../types/api';

interface UseAuthReturn {
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  logout: () => Promise<void>;
  getMe: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, logout: storeLogout, setUser } = useAuthStore();

  const login = useCallback(
    async (payload: LoginPayload): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.post<ApiResponse<AuthResponse>>('/api/auth/login', payload);
        const { user, token } = res.data.data;
        setAuth(user, token);
        return true;
      } catch (err: unknown) {
        const message =
          err && typeof err === 'object' && 'response' in err
            ? (err as { response: { data: { message: string } } }).response.data.message
            : err instanceof Error
              ? err.message
              : 'Login failed';
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setAuth],
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.post<ApiResponse<AuthResponse>>('/api/auth/register', payload);
        const { user, token } = res.data.data;
        setAuth(user, token);
        return true;
      } catch (err: unknown) {
        const message =
          err && typeof err === 'object' && 'response' in err
            ? (err as { response: { data: { message: string } } }).response.data.message
            : err instanceof Error
              ? err.message
              : 'Registration failed';
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setAuth],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await api.post('/api/auth/logout');
    } catch {
      // proceed with logout even if request fails
    } finally {
      storeLogout();
      setLoading(false);
    }
  }, [storeLogout]);

  const getMe = useCallback(async () => {
    try {
      const res = await api.get<ApiResponse<User>>('/api/auth/me');
      setUser(res.data.data);
    } catch {
      // silently fail, auth store handles redirect
    }
  }, [setUser]);

  return { login, register, logout, getMe, loading, error };
}
