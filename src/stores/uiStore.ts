import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
  activeNav: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setActiveNav: (nav: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'dark',
      activeNav: '/',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.classList.toggle('light', next === 'light');
          document.documentElement.classList.toggle('dark', next === 'dark');
          return { theme: next };
        }),
      setTheme: (theme) => {
        document.documentElement.classList.toggle('light', theme === 'light');
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },
      setActiveNav: (nav) => set({ activeNav: nav }),
    }),
    {
      name: 'ui-storage',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          document.documentElement.classList.toggle('light', state.theme === 'light');
          document.documentElement.classList.toggle('dark', state.theme === 'dark');
        }
      },
    },
  ),
);
