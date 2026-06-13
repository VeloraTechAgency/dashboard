import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { staffData } from '../../types/staff';

const roleGradients: Record<string, string> = {
  'Frontend Developer': 'from-primary-500 to-primary-700',
  'Backend Developer': 'from-emerald-500 to-emerald-700',
  'Creative UI/UX': 'from-violet-500 to-violet-700',
  'Admin Marketing': 'from-amber-500 to-amber-700',
};

export function HeroProfileCards() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
            Meet Our Team
          </h2>
          <p className="mt-4 text-navy-300 max-w-2xl mx-auto">
            The talented people behind Velora Tech Agency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {staffData.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`h-16 w-16 shrink-0 rounded-full bg-gradient-to-br ${roleGradients[member.role] || 'from-primary-500 to-primary-700'} flex items-center justify-center text-lg font-bold text-white font-display`}
                  >
                    {member.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white font-display">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary-400 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-navy-300 leading-relaxed">
                    {member.vision}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
