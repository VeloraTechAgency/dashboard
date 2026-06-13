import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useServices } from '../../hooks/useServices';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { getIconComponent, formatCurrency } from '../../lib/utils';

export function ServicesSection() {
  const { services, status, fetchServices } = useServices();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 -right-32 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 -left-32 h-80 w-80 rounded-full bg-primary-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1 text-xs font-medium text-primary-400">
            What We Offer
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
            Our Services
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
            Comprehensive IT solutions tailored to elevate your business
          </p>
        </motion.div>

        {status === 'loading' && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {status === 'success' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.is_active)
              .map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover>
                    <span className="text-3xl mb-4 block">
                      {getIconComponent(service.icon)}
                    </span>
                    <h3 className="text-lg font-semibold text-white font-display mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-navy-400 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-400 font-semibold font-display">
                        {formatCurrency(service.price)}
                      </span>
                      <span className="text-xs text-navy-500">Starting from</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </div>
        )}

        {status === 'error' && (
          <p className="text-center text-navy-400">
            Unable to load services. Please try again later.
          </p>
        )}
      </div>
    </section>
  );
}
