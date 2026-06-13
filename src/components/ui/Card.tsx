import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-navy-700/50 bg-navy-800/50 backdrop-blur-sm p-6 transition-all duration-300',
        hover && 'hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-0.5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
