import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatsCard({ title, value, icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn('flex items-center gap-4', className)}>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-2xl">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-navy-400">{title}</p>
        <p className="text-2xl font-bold text-white font-display">{value}</p>
        {trend && (
          <span
            className={cn(
              'text-xs',
              trend.positive ? 'text-emerald-400' : 'text-red-400',
            )}
          >
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
    </Card>
  );
}
