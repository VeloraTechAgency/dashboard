import { useEffect } from 'react';
import { useTestimonials } from '../../hooks/useTestimonials';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';
import { formatDate } from '../../lib/utils';

export function TestimonialsList() {
  const { testimonials, status, error, fetchTestimonials, deleteTestimonial } =
    useTestimonials();

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  async function handleDelete(id: number) {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id);
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <ErrorState
        message={error || 'Failed to load testimonials'}
        onRetry={fetchTestimonials}
      />
    );
  }

  if (testimonials.length === 0) {
    return (
      <EmptyState
        title="No testimonials yet"
        description="Testimonials will appear here once clients share their feedback."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {testimonials.map((t) => (
        <Card key={t.id}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-white">{t.client_name}</p>
              <p className="text-xs text-navy-400">{t.client_company}</p>
            </div>
            <Badge variant={t.is_active ? 'success' : 'default'}>
              {t.is_active ? 'Active' : 'Inactive'}
            </Badge>
          </div>
          <p className="text-sm text-navy-300 mb-3 line-clamp-3">
            &ldquo;{t.message}&rdquo;
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-sm ${i < t.rating ? 'text-amber-400' : 'text-navy-600'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-navy-500">{formatDate(t.created_at)}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-400 hover:text-red-300"
                onClick={() => handleDelete(t.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
