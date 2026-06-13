import { useState, useCallback } from 'react';
import api from '../lib/axios';
import type { Service, ServicePayload, ServiceUpdatePayload } from '../types/service';
import type { ApiResponse } from '../types/api';
import type { AsyncStatus } from '../types/api';

interface UseServicesReturn {
  services: Service[];
  status: AsyncStatus;
  error: string | null;
  fetchServices: () => Promise<void>;
  getService: (id: number) => Promise<Service | null>;
  createService: (payload: ServicePayload) => Promise<boolean>;
  updateService: (id: number, payload: ServiceUpdatePayload) => Promise<boolean>;
  deleteService: (id: number) => Promise<boolean>;
}

export function useServices(): UseServicesReturn {
  const [services, setServices] = useState<Service[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get<ApiResponse<Service[]>>('/api/services');
      setServices(res.data.data);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch services';
      setError(message);
      setStatus('error');
    }
  }, []);

  const getService = useCallback(async (id: number): Promise<Service | null> => {
    try {
      const res = await api.get<ApiResponse<Service>>(`/api/services/${id}`);
      return res.data.data;
    } catch {
      return null;
    }
  }, []);

  const createService = useCallback(async (payload: ServicePayload): Promise<boolean> => {
    try {
      const res = await api.post<ApiResponse<Service>>('/api/services', payload);
      setServices((prev) => [...prev, res.data.data]);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create service';
      setError(message);
      return false;
    }
  }, []);

  const updateService = useCallback(
    async (id: number, payload: ServiceUpdatePayload): Promise<boolean> => {
      try {
        const res = await api.put<ApiResponse<Service>>(`/api/services/${id}`, payload);
        setServices((prev) =>
          prev.map((s) => (s.id === id ? res.data.data : s)),
        );
        return true;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to update service';
        setError(message);
        return false;
      }
    },
    [],
  );

  const deleteService = useCallback(async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/api/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete service';
      setError(message);
      return false;
    }
  }, []);

  return {
    services,
    status,
    error,
    fetchServices,
    getService,
    createService,
    updateService,
    deleteService,
  };
}
