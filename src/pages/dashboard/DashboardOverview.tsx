import { useEffect } from 'react';
import { useServices } from '../../hooks/useServices';
import { useProjects } from '../../hooks/useProjects';
import { useTestimonials } from '../../hooks/useTestimonials';
import { useContacts } from '../../hooks/useContacts';
import { useInterval } from '../../hooks/useInterval';
import { StatsCard } from '../../components/dashboard/StatsCard';
import { RecentContacts } from '../../components/dashboard/RecentContacts';
import { StaffTeam } from '../../components/dashboard/StaffTeam';
import { PageSpinner } from '../../components/ui/Spinner';

export function DashboardOverview() {
  const { services, fetchServices } = useServices();
  const { projects, fetchProjects } = useProjects();
  const { testimonials, fetchTestimonials } = useTestimonials();
  const { contacts, unreadCount, fetchContacts } = useContacts();

  useEffect(() => {
    fetchServices();
    fetchProjects();
    fetchTestimonials();
    fetchContacts();
  }, [fetchServices, fetchProjects, fetchTestimonials, fetchContacts]);

  useInterval(() => {
    fetchContacts();
  }, 30000);

  const isLoading =
    services.length === 0 &&
    projects.length === 0 &&
    testimonials.length === 0 &&
    contacts.length === 0;

  if (isLoading) return <PageSpinner />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Services"
          value={services.length}
          icon="⚡"
        />
        <StatsCard
          title="Total Projects"
          value={projects.length}
          icon="📦"
        />
        <StatsCard
          title="Testimonials"
          value={testimonials.length}
          icon="💬"
        />
        <StatsCard
          title="Unread Messages"
          value={unreadCount}
          icon="📬"
        />
      </div>

      <StaffTeam />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentContacts />
        <div className="rounded-xl border border-navy-700/50 bg-navy-800/50 backdrop-blur-sm p-6">
          <h3 className="text-lg font-semibold text-white font-display mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-navy-400">
                  Active Services ({services.filter((s) => s.is_active).length}/{services.length})
                </span>
                <span className="text-navy-300">
                  {services.length > 0
                    ? Math.round(
                        (services.filter((s) => s.is_active).length / services.length) * 100,
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="h-2 rounded-full bg-navy-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary-500 transition-all duration-500"
                  style={{
                    width: `${services.length > 0 ? (services.filter((s) => s.is_active).length / services.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-navy-400">
                  Featured Projects ({projects.filter((p) => p.is_featured).length}/{projects.length})
                </span>
                <span className="text-navy-300">
                  {projects.length > 0
                    ? Math.round(
                        (projects.filter((p) => p.is_featured).length / projects.length) * 100,
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="h-2 rounded-full bg-navy-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{
                    width: `${projects.length > 0 ? (projects.filter((p) => p.is_featured).length / projects.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-navy-400">
                  Read Messages ({contacts.filter((c) => c.is_read).length}/{contacts.length})
                </span>
                <span className="text-navy-300">
                  {contacts.length > 0
                    ? Math.round(
                        (contacts.filter((c) => c.is_read).length / contacts.length) * 100,
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="h-2 rounded-full bg-navy-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${contacts.length > 0 ? (contacts.filter((c) => c.is_read).length / contacts.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
