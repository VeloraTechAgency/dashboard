import { StaffTeam } from '../../components/dashboard/StaffTeam';

export function StaffPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-display">Staff</h1>
        <p className="text-sm text-navy-400 mt-1">Manage your team members</p>
      </div>
      <StaffTeam />
    </div>
  );
}
