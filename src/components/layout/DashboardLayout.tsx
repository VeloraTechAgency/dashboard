import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-navy-900">
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-20 transition-all duration-300">
        <DashboardHeader />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
