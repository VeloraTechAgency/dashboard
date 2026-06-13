import { useState, useCallback } from 'react';
import api from '../lib/axios';
import type { Project, ProjectPayload, ProjectUpdatePayload } from '../types/project';
import type { ApiResponse } from '../types/api';
import type { AsyncStatus } from '../types/api';

interface UseProjectsReturn {
  projects: Project[];
  featuredProjects: Project[];
  status: AsyncStatus;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchFeaturedProjects: () => Promise<void>;
  getProject: (id: number) => Promise<Project | null>;
  createProject: (payload: ProjectPayload) => Promise<boolean>;
  updateProject: (id: number, payload: ProjectUpdatePayload) => Promise<boolean>;
  deleteProject: (id: number) => Promise<boolean>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get<ApiResponse<Project[]>>('/api/projects');
      setProjects(res.data.data);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(message);
      setStatus('error');
    }
  }, []);

  const fetchFeaturedProjects = useCallback(async () => {
    try {
      const res = await api.get<ApiResponse<Project[]>>('/api/projects/featured');
      setFeaturedProjects(res.data.data);
    } catch {
      // non-critical for UI
    }
  }, []);

  const getProject = useCallback(async (id: number): Promise<Project | null> => {
    try {
      const res = await api.get<ApiResponse<Project>>(`/api/projects/${id}`);
      return res.data.data;
    } catch {
      return null;
    }
  }, []);

  const createProject = useCallback(async (payload: ProjectPayload): Promise<boolean> => {
    try {
      const res = await api.post<ApiResponse<Project>>('/api/projects', payload);
      setProjects((prev) => [...prev, res.data.data]);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create project';
      setError(message);
      return false;
    }
  }, []);

  const updateProject = useCallback(
    async (id: number, payload: ProjectUpdatePayload): Promise<boolean> => {
      try {
        const res = await api.put<ApiResponse<Project>>(`/api/projects/${id}`, payload);
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? res.data.data : p)),
        );
        return true;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to update project';
        setError(message);
        return false;
      }
    },
    [],
  );

  const deleteProject = useCallback(async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete project';
      setError(message);
      return false;
    }
  }, []);

  return {
    projects,
    featuredProjects,
    status,
    error,
    fetchProjects,
    fetchFeaturedProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  };
}
