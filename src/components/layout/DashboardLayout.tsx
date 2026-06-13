import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { useUIStore } from '../../stores/uiStore';
import { cn } from '../../lib/utils';

export function DashboardLayout() {
  const { sidebarOpen } = useUIStore();

  return (
    <div className="flex min-h-screen bg-navy-900">
      <Sidebar />
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300',
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-20',
        )}
      >
        <DashboardHeader />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
