import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../../hooks/useProjects';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Spinner } from '../ui/Spinner';

export function ProjectsSection() {
  const { featuredProjects, status, fetchFeaturedProjects } = useProjects();

  useEffect(() => {
    fetchFeaturedProjects();
  }, [fetchFeaturedProjects]);

  return (
    <section id="projects" className="relative overflow-hidden py-20 sm:py-28 bg-navy-900/50">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 h-80 w-80 rounded-full bg-primary-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1 text-xs font-medium text-primary-400">
            Our Work
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
            Featured Projects
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
            Showcasing our best work and innovative solutions
          </p>
        </motion.div>

        {status === 'loading' && (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        )}

        {status === 'success' && featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                <Card hover className="h-full flex flex-col">
                  {project.thumbnail && (
                    <div className="aspect-video rounded-lg bg-navy-700 mb-4 overflow-hidden">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-white font-display mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-navy-400 mb-4 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {JSON.parse(project.tech_stack || '[]').map(
                      (tech: string) => (
                        <Badge key={tech} variant="info">
                          {tech.trim()}
                        </Badge>
                      ),
                    )}
                  </div>
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-sm text-primary-400 hover:text-primary-300 transition-colors inline-flex items-center gap-1"
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {status === 'success' && featuredProjects.length === 0 && (
          <p className="text-center text-navy-400">No featured projects yet.</p>
        )}

        {status === 'error' && (
          <p className="text-center text-navy-400">
            Unable to load projects. Please try again later.
          </p>
        )}
      </div>
    </section>
  );
}
