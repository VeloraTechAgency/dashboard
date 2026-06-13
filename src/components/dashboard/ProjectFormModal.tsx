import { useState, useCallback } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useProjects } from '../../hooks/useProjects';
import type { Project, ProjectPayload } from '../../types/project';

interface ProjectFormModalProps {
  open: boolean;
  onClose: () => void;
  editProject: Project | null;
}

export function ProjectFormModal({ open, onClose, editProject }: ProjectFormModalProps) {
  const { createProject, updateProject } = useProjects();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProjectPayload>(() =>
    editProject
      ? {
          title: editProject.title,
          description: editProject.description,
          thumbnail: editProject.thumbnail || '',
          tech_stack: editProject.tech_stack,
          project_url: editProject.project_url || '',
          is_featured: editProject.is_featured,
          is_active: editProject.is_active,
        }
      : {
          title: '',
          description: '',
          thumbnail: '',
          tech_stack: '',
          project_url: '',
          is_featured: false,
          is_active: true,
        },
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.title || !form.description) return;
      setLoading(true);
      const success = editProject
        ? await updateProject(editProject.id, form)
        : await createProject(form);
      setLoading(false);
      if (success) onClose();
    },
    [form, editProject, createProject, updateProject, onClose],
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editProject ? 'Edit Project' : 'Create Project'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          placeholder="SaaS Platform"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          required
        />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-navy-300">Description</label>
          <textarea
            placeholder="Project description..."
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            rows={3}
            required
            className="w-full rounded-lg border border-navy-600 bg-navy-800/50 px-4 py-2.5 text-sm text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 resize-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Thumbnail URL"
            placeholder="https://example.com/image.jpg"
            value={form.thumbnail}
            onChange={(e) => setForm((p) => ({ ...p, thumbnail: e.target.value }))}
          />
          <Input
            label="Project URL"
            placeholder="https://example.com/project"
            value={form.project_url}
            onChange={(e) => setForm((p) => ({ ...p, project_url: e.target.value }))}
          />
        </div>
        <Input
          label="Tech Stack (JSON array)"
          placeholder='["Laravel", "React", "PostgreSQL"]'
          value={form.tech_stack}
          onChange={(e) => setForm((p) => ({ ...p, tech_stack: e.target.value }))}
          required
        />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={form.is_featured}
              onChange={(e) => setForm((p) => ({ ...p, is_featured: e.target.checked }))}
              className="rounded border-navy-600 bg-navy-800 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="is_featured" className="text-sm text-navy-300">
              Featured
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={form.is_active}
              onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
              className="rounded border-navy-600 bg-navy-800 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="is_active" className="text-sm text-navy-300">
              Active
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {editProject ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
