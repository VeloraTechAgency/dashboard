import { ThemeToggle } from '../ui/ThemeToggle';
import { NotificationBell } from './NotificationBell';
import { useUIStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';

export function DashboardHeader() {
  const { toggleSidebar } = useUIStore();
  const user = useAuthStore((s) => s.user);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-navy-700/50 bg-navy-900/80 backdrop-blur-xl px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-navy-400 hover:text-white hover:bg-navy-700 transition-colors lg:hidden"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-white font-display">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <NotificationBell />
        <ThemeToggle />
      </div>
    </header>
  );
}
