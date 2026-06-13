export interface Testimonial {
  id: number;
  client_name: string;
  client_company: string;
  message: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialPayload {
  client_name: string;
  client_company: string;
  message: string;
  rating: number;
  is_active: boolean;
}
