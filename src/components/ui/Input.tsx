import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-navy-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-lg border bg-navy-800/50 px-4 py-2.5 text-sm text-white placeholder-navy-400 transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500',
          error
            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
            : 'border-navy-600 hover:border-navy-500',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className, id, ...props }: TextAreaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-navy-300"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          'w-full rounded-lg border bg-navy-800/50 px-4 py-2.5 text-sm text-white placeholder-navy-400 transition-colors duration-200 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500',
          error
            ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500'
            : 'border-navy-600 hover:border-navy-500',
          className,
        )}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
