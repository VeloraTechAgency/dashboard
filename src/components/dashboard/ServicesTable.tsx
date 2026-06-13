import { useEffect } from 'react';
import { useServices } from '../../hooks/useServices';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';
import { formatCurrency } from '../../lib/utils';
import type { Service } from '../../types/service';

interface ServicesTableProps {
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export function ServicesTable({ onEdit, onDelete }: ServicesTableProps) {
  const { services, status, error, fetchServices } = useServices();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (status === 'error') {
    return <ErrorState message={error || 'Failed to load services'} onRetry={fetchServices} />;
  }

  if (services.length === 0) {
    return (
      <EmptyState
        title="No services yet"
        description="Create your first service to get started."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-navy-700/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-navy-700/50 bg-navy-800/50">
            <th className="px-4 py-3 text-left font-medium text-navy-300">Title</th>
            <th className="px-4 py-3 text-left font-medium text-navy-300 hidden md:table-cell">
              Description
            </th>
            <th className="px-4 py-3 text-left font-medium text-navy-300">Price</th>
            <th className="px-4 py-3 text-left font-medium text-navy-300">Status</th>
            <th className="px-4 py-3 text-right font-medium text-navy-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-700/50">
          {services.map((service) => (
            <tr
              key={service.id}
              className="hover:bg-navy-800/30 transition-colors"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getIconForService(service.icon)}</span>
                  <span className="font-medium text-white">{service.title}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-navy-400 hidden md:table-cell max-w-xs truncate">
                {service.description}
              </td>
              <td className="px-4 py-3 text-white font-medium">
                {formatCurrency(service.price)}
              </td>
              <td className="px-4 py-3">
                <Badge variant={service.is_active ? 'success' : 'default'}>
                  {service.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(service)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                    onClick={() => onDelete(service)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function getIconForService(icon: string): string {
  const icons: Record<string, string> = {
    cloud: '☁️', code: '💻', design: '🎨', mobile: '📱',
    seo: '🔍', marketing: '📊', security: '🔒', support: '🎧',
  };
  return icons[icon] || '⚙️';
}
