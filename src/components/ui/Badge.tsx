import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  children: ReactNode;
  className?: string;
}

const badgeVariants: Record<string, string> = {
  default: 'bg-navy-700 text-navy-200',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
  info: 'bg-primary-500/10 text-primary-400 border border-primary-500/20',
};

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
