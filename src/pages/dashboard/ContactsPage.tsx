import { ContactsTable } from '../../components/dashboard/ContactsTable';

export function ContactsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-display">Contacts</h1>
        <p className="text-sm text-navy-400 mt-1">
          Manage incoming contact form submissions
        </p>
      </div>
      <ContactsTable />
    </div>
  );
}
