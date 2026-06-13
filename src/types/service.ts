export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServicePayload {
  title: string;
  description: string;
  icon: string;
  price: number;
  is_active: boolean;
}

export interface ServiceUpdatePayload {
  title?: string;
  description?: string;
  icon?: string;
  price?: number;
  is_active?: boolean;
}
