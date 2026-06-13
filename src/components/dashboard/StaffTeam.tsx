import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staffData as initialStaff, type Staff, type StaffPayload } from '../../types/staff';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { StaffFormModal } from './StaffFormModal';

const departmentBadge: Record<string, 'info' | 'warning' | 'success'> = {
  Engineering: 'info',
  Design: 'warning',
  Marketing: 'success',
};

const roleGradients: Record<string, string> = {
  'Frontend Developer': 'from-primary-500 to-primary-700',
  'Backend Developer': 'from-blue-500 to-blue-700',
  'Creative UI/UX': 'from-amber-500 to-rose-600',
  'Admin Marketing': 'from-emerald-500 to-teal-600',
};

function getGradient(role: string): string {
  return roleGradients[role] || 'from-primary-500 to-primary-700';
}

function getShadow(role: string): string {
  if (role === 'Frontend Developer') return 'shadow-primary-500/20';
  if (role === 'Backend Developer') return 'shadow-blue-500/20';
  if (role === 'Creative UI/UX') return 'shadow-amber-500/20';
  if (role === 'Admin Marketing') return 'shadow-emerald-500/20';
  return 'shadow-primary-500/20';
}

function StaffCard({
  member,
  onEdit,
  onDelete,
}: {
  member: Staff;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group"
    >
      <Card className="h-full flex flex-col border-t-4 border-t-transparent hover:border-t-primary-500 transition-all duration-300">
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${getGradient(member.role)} text-white font-bold text-xl font-display shadow-lg ${getShadow(member.role)}`}>
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              member.initials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-white font-display truncate">
              {member.name}
            </h3>
            <p className="text-sm text-primary-400 font-medium">{member.role}</p>
            <Badge
              variant={departmentBadge[member.department] || 'default'}
              className="mt-1.5"
            >
              {member.department}
            </Badge>
          </div>
        </div>

        <div className="flex-1 space-y-3 min-w-0">
          <div>
            <h4 className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1 font-display">
              Vision
            </h4>
            <p className="text-sm text-navy-300 leading-relaxed line-clamp-2">
              {member.vision}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-1 font-display">
              Mission
            </h4>
            <p className="text-sm text-navy-300 leading-relaxed line-clamp-2">
              {member.mission}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4 mb-3">
          {member.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-navy-700/50 px-2 py-0.5 text-[11px] font-medium text-navy-400"
            >
              {skill}
            </span>
          ))}
          {member.skills.length > 3 && (
            <span className="rounded-md bg-navy-700/50 px-2 py-0.5 text-[11px] font-medium text-navy-500">
              +{member.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-navy-700/30">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-navy-400 hover:text-white hover:bg-navy-700 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-navy-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

export function StaffTeam() {
  const [members, setMembers] = useState<Staff[]>(initialStaff);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMember, setEditMember] = useState<Staff | null>(null);

  const handleSave = useCallback(async (payload: StaffPayload, id?: number): Promise<boolean> => {
    if (id) {
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...payload } : m)),
      );
    } else {
      const newMember: Staff = {
        id: Math.max(0, ...members.map((m) => m.id)) + 1,
        ...payload,
      };
      setMembers((prev) => [...prev, newMember]);
    }
    return true;
  }, [members]);

  const handleDelete = useCallback((member: Staff) => {
    if (window.confirm(`Delete staff "${member.name}"?`)) {
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    }
  }, []);

  function handleEdit(member: Staff) {
    setEditMember(member);
    setModalOpen(true);
  }

  function handleAdd() {
    setEditMember(null);
    setModalOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white font-display">
            Our Team
          </h3>
          <p className="text-sm text-navy-400 mt-0.5">
            {members.length} talented members ready to build your vision
          </p>
        </div>
        <Button size="sm" onClick={handleAdd}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Staff
        </Button>
      </div>

      {members.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <div className="flex justify-center mb-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-700">
                <svg className="w-8 h-8 text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-navy-400 font-medium">No staff members yet</p>
            <p className="text-sm text-navy-500 mt-1">Add your first team member to get started.</p>
            <Button size="sm" className="mt-4" onClick={handleAdd}>
              + Add Staff
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {members.map((member) => (
              <StaffCard
                key={member.id}
                member={member}
                onEdit={() => handleEdit(member)}
                onDelete={() => handleDelete(member)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <StaffFormModal
        key={modalOpen ? `staff-${editMember?.id ?? 'new'}` : 'closed'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editStaff={editMember}
        onSave={handleSave}
      />
    </div>
  );
}
