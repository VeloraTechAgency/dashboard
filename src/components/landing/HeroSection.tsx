import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-navy-800/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-navy-900" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-primary-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1 text-xs font-medium text-primary-400 mb-6">
              Trusted by 100+ Companies
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-tight"
          >
            We Forge Digital{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
              Solutions
            </span>{' '}
            That Matter
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-navy-300 max-w-xl mx-auto"
          >
            From web applications to cloud infrastructure, we deliver enterprise-grade
            solutions that drive business growth and innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Button size="lg">Start Your Project</Button>
            <Button variant="outline" size="lg">
              View Our Work
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
