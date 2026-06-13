import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { useUIStore } from '../../stores/uiStore';
import { cn } from '../../lib/utils';

export function DashboardLayout() {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex min-h-screen bg-navy-900 overflow-x-hidden">
      <Sidebar />
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300 min-w-0',
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20',
        )}
      >
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
