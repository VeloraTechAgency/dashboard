import { useState } from 'react';
import { ProjectsTable } from '../../components/dashboard/ProjectsTable';
import { ProjectFormModal } from '../../components/dashboard/ProjectFormModal';
import { Button } from '../../components/ui/Button';
import { useProjects } from '../../hooks/useProjects';
import type { Project } from '../../types/project';

export function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const { deleteProject } = useProjects();

  function handleEdit(project: Project) {
    setEditProject(project);
    setModalOpen(true);
  }

  function handleCreate() {
    setEditProject(null);
    setModalOpen(true);
  }

  async function handleDelete(project: Project) {
    if (window.confirm(`Delete project "${project.title}"?`)) {
      await deleteProject(project.id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Projects</h1>
          <p className="text-sm text-navy-400 mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleCreate}>+ New Project</Button>
      </div>

      <ProjectsTable onEdit={handleEdit} onDelete={handleDelete} />

      <ProjectFormModal
        key={modalOpen ? `project-${editProject?.id ?? 'new'}` : 'closed'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editProject={editProject}
      />
    </div>
  );
}
