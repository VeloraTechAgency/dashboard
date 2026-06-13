import { useEffect } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';
import { formatDate } from '../../lib/utils';
import type { Project } from '../../types/project';

function parseTechStack(techStack: string): string[] {
  try {
    const parsed = JSON.parse(techStack || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return techStack ? techStack.split(',').map((s) => s.trim()) : [];
  }
}

interface ProjectsTableProps {
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export function ProjectsTable({ onEdit, onDelete }: ProjectsTableProps) {
  const { projects, status, error, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (status === 'error') {
    return <ErrorState message={error || 'Failed to load projects'} onRetry={fetchProjects} />;
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects yet"
        description="Create your first project to showcase your work."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-navy-700/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-navy-700/50 bg-navy-800/50">
            <th className="px-4 py-3 text-left font-medium text-navy-300">Title</th>
            <th className="px-4 py-3 text-left font-medium text-navy-300 hidden md:table-cell">
              Tech Stack
            </th>
            <th className="px-4 py-3 text-left font-medium text-navy-300">Featured</th>
            <th className="px-4 py-3 text-left font-medium text-navy-300">Status</th>
            <th className="px-4 py-3 text-left font-medium text-navy-300 hidden lg:table-cell">
              Created
            </th>
            <th className="px-4 py-3 text-right font-medium text-navy-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-700/50">
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-navy-800/30 transition-colors"
            >
              <td className="px-4 py-3">
                <span className="font-medium text-white">{project.title}</span>
              </td>
              <td className="px-4 py-3 hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {parseTechStack(project.tech_stack).map(
                    (tech: string) => (
                      <Badge key={tech} variant="info">
                        {tech.trim()}
                      </Badge>
                    ),
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                {project.is_featured ? (
                  <Badge variant="warning">Featured</Badge>
                ) : (
                  <span className="text-navy-500">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                <Badge variant={project.is_active ? 'success' : 'default'}>
                  {project.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </td>
              <td className="px-4 py-3 text-navy-400 hidden lg:table-cell">
                {formatDate(project.created_at)}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(project)}>
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                    onClick={() => onDelete(project)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
