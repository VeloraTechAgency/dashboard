import { useState, useCallback } from 'react';
import api from '../lib/axios';
import type { Testimonial, TestimonialPayload } from '../types/testimonial';
import type { ApiResponse } from '../types/api';
import type { AsyncStatus } from '../types/api';

interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  status: AsyncStatus;
  error: string | null;
  fetchTestimonials: () => Promise<void>;
  createTestimonial: (payload: TestimonialPayload) => Promise<boolean>;
  deleteTestimonial: (id: number) => Promise<boolean>;
}

export function useTestimonials(): UseTestimonialsReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get<ApiResponse<Testimonial[]>>('/api/testimonials');
      setTestimonials(res.data.data);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch testimonials';
      setError(message);
      setStatus('error');
    }
  }, []);

  const createTestimonial = useCallback(
    async (payload: TestimonialPayload): Promise<boolean> => {
      try {
        const res = await api.post<ApiResponse<Testimonial>>('/api/testimonials', payload);
        setTestimonials((prev) => [...prev, res.data.data]);
        return true;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to create testimonial';
        setError(message);
        return false;
      }
    },
    [],
  );

  const deleteTestimonial = useCallback(async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/api/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete testimonial';
      setError(message);
      return false;
    }
  }, []);

  return {
    testimonials,
    status,
    error,
    fetchTestimonials,
    createTestimonial,
    deleteTestimonial,
  };
}
