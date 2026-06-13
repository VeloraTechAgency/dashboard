import { TestimonialsList } from '../../components/dashboard/TestimonialsList';

export function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-display">Testimonials</h1>
        <p className="text-sm text-navy-400 mt-1">
          Client feedback and reviews
        </p>
      </div>
      <TestimonialsList />
    </div>
  );
}
