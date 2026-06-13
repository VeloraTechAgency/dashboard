import { useState, useCallback } from 'react';
import { Modal } from '../ui/Modal';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import type { Staff, StaffPayload } from '../../types/staff';

interface StaffFormModalProps {
  open: boolean;
  onClose: () => void;
  editStaff: Staff | null;
  onSave: (payload: StaffPayload, id?: number) => Promise<boolean>;
}

export function StaffFormModal({ open, onClose, editStaff, onSave }: StaffFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<StaffPayload>(() =>
    editStaff
      ? {
          name: editStaff.name,
          role: editStaff.role,
          department: editStaff.department,
          avatar: editStaff.avatar,
          initials: editStaff.initials,
          email: editStaff.email,
          phone: editStaff.phone,
          bio: editStaff.bio,
          vision: editStaff.vision,
          mission: editStaff.mission,
          skills: editStaff.skills,
          social: { ...editStaff.social },
        }
      : {
          name: '',
          role: '',
          department: '',
          avatar: '',
          initials: '',
          email: '',
          phone: '',
          bio: '',
          vision: '',
          mission: '',
          skills: [],
          social: {},
        },
  );
  const [skillsInput, setSkillsInput] = useState(() => editStaff?.skills.join(', ') ?? '');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name || !form.role) return;
      setLoading(true);
      const success = await onSave(form, editStaff?.id);
      setLoading(false);
      if (success) onClose();
    },
    [form, editStaff, onSave, onClose],
  );

  const updateForm = useCallback(
    <K extends keyof StaffPayload>(key: K, value: StaffPayload[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editStaff ? 'Edit Staff' : 'Add Staff'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => updateForm('name', e.target.value)}
            required
          />
          <Input
            label="Initials"
            placeholder="JD"
            value={form.initials}
            onChange={(e) => updateForm('initials', e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Role"
            placeholder="Frontend Developer"
            value={form.role}
            onChange={(e) => updateForm('role', e.target.value)}
            required
          />
          <Input
            label="Department"
            placeholder="Engineering"
            value={form.department}
            onChange={(e) => updateForm('department', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => updateForm('email', e.target.value)}
          />
          <Input
            label="Phone"
            placeholder="+62 812 3456 7890"
            value={form.phone}
            onChange={(e) => updateForm('phone', e.target.value)}
          />
        </div>
        <Input
          label="Avatar URL"
          placeholder="https://example.com/avatar.jpg"
          value={form.avatar}
          onChange={(e) => updateForm('avatar', e.target.value)}
        />
        <Input
          label="Skills (comma separated)"
          placeholder="React, TypeScript, Tailwind CSS"
          value={skillsInput}
          onChange={(e) => {
            setSkillsInput(e.target.value);
            updateForm('skills', e.target.value.split(',').map((s) => s.trim()).filter(Boolean));
          }}
        />
        <TextArea
          label="Bio"
          placeholder="Short biography..."
          value={form.bio}
          onChange={(e) => updateForm('bio', e.target.value)}
        />
        <TextArea
          label="Vision"
          placeholder="Vision statement..."
          value={form.vision}
          onChange={(e) => updateForm('vision', e.target.value)}
        />
        <TextArea
          label="Mission"
          placeholder="Mission statement..."
          value={form.mission}
          onChange={(e) => updateForm('mission', e.target.value)}
        />
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-navy-300">Social Links</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              placeholder="GitHub URL"
              value={form.social.github || ''}
              onChange={(e) => updateForm('social', { ...form.social, github: e.target.value })}
            />
            <Input
              placeholder="LinkedIn URL"
              value={form.social.linkedin || ''}
              onChange={(e) => updateForm('social', { ...form.social, linkedin: e.target.value })}
            />
            <Input
              placeholder="Twitter URL"
              value={form.social.twitter || ''}
              onChange={(e) => updateForm('social', { ...form.social, twitter: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {editStaff ? 'Update' : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
