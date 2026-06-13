export const API_URL = import.meta.env.VITE_API_URL as string;

export const APP_CONFIG = {
  apiUrl: API_URL || 'http://localhost:8090',
  appName: 'Velora Tech Agency',
  pollingInterval: 30000,
} as const;
