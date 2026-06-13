import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestimonials } from '../../hooks/useTestimonials';
import { Spinner } from '../ui/Spinner';

export function TestimonialsSection() {
  const { testimonials, status, fetchTestimonials } = useTestimonials();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const activeTestimonials = testimonials.filter((t) => t.is_active);

  useEffect(() => {
    if (activeTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeTestimonials.length]);

  function renderStars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-amber-400' : 'text-navy-600'}`}
      >
        ★
      </span>
    ));
  }

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-bl from-primary-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute bottom-1/3 -left-32 h-80 w-80 rounded-full bg-primary-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1 text-xs font-medium text-primary-400">
            Testimonials
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <p className="mt-4 text-navy-300 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from our clients
          </p>
        </motion.div>

        {status === 'loading' && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {status === 'success' && activeTestimonials.length > 0 && (
          <div className="relative mx-auto max-w-3xl">
            <div className="relative min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    {renderStars(activeTestimonials[current].rating)}
                  </div>
                  <blockquote className="text-lg text-navy-200 italic leading-relaxed">
                    &ldquo;{activeTestimonials[current].message}&rdquo;
                  </blockquote>
                  <div className="mt-6">
                    <p className="text-white font-semibold font-display">
                      {activeTestimonials[current].client_name}
                    </p>
                    <p className="text-sm text-navy-400">
                      {activeTestimonials[current].client_company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {activeTestimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {activeTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? 'w-8 bg-primary-500'
                        : 'w-2 bg-navy-600 hover:bg-navy-500'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {status === 'success' && activeTestimonials.length === 0 && (
          <p className="text-center text-navy-400">No testimonials yet.</p>
        )}
      </div>
    </section>
  );
}
