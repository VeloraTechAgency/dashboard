export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
  tech_stack: string;
  project_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectPayload {
  title: string;
  description: string;
  thumbnail: string;
  tech_stack: string;
  project_url: string;
  is_featured: boolean;
  is_active: boolean;
}

export interface ProjectUpdatePayload {
  title?: string;
  description?: string;
  thumbnail?: string;
  tech_stack?: string;
  project_url?: string;
  is_featured?: boolean;
  is_active?: boolean;
}
