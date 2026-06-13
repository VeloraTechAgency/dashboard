export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';
