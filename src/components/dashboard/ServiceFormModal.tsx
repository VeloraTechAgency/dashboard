import { useState, useCallback } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useServices } from '../../hooks/useServices';
import type { Service, ServicePayload } from '../../types/service';

interface ServiceFormModalProps {
  open: boolean;
  onClose: () => void;
  editService: Service | null;
}

const iconOptions = [
  { value: 'cloud', label: '☁️ Cloud' },
  { value: 'code', label: '💻 Code' },
  { value: 'design', label: '🎨 Design' },
  { value: 'mobile', label: '📱 Mobile' },
  { value: 'seo', label: '🔍 SEO' },
  { value: 'marketing', label: '📊 Marketing' },
  { value: 'security', label: '🔒 Security' },
  { value: 'support', label: '🎧 Support' },
];

export function ServiceFormModal({ open, onClose, editService }: ServiceFormModalProps) {
  const { createService, updateService } = useServices();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ServicePayload>(() =>
    editService
      ? {
          title: editService.title,
          description: editService.description,
          icon: editService.icon,
          price: editService.price,
          is_active: editService.is_active,
        }
      : { title: '', description: '', icon: 'code', price: 0, is_active: true },
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.title || !form.description) return;
      setLoading(true);
      const success = editService
        ? await updateService(editService.id, form)
        : await createService(form);
      setLoading(false);
      if (success) onClose();
    },
    [form, editService, createService, updateService, onClose],
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editService ? 'Edit Service' : 'Create Service'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          placeholder="Cloud Services"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          required
        />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-navy-300">Icon</label>
          <select
            value={form.icon}
            onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
            className="w-full rounded-lg border border-navy-600 bg-navy-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
          >
            {iconOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-navy-300">Description</label>
          <textarea
            placeholder="Describe the service..."
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            rows={3}
            required
            className="w-full rounded-lg border border-navy-600 bg-navy-800/50 px-4 py-2.5 text-sm text-white placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 resize-none"
          />
        </div>
        <Input
          label="Price (IDR)"
          type="number"
          placeholder="7000000"
          value={form.price || ''}
          onChange={(e) => setForm((p) => ({ ...p, price: Number(e.target.value) }))}
          required
        />
        <div className="flex items-center gap-3">
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
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {editService ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
