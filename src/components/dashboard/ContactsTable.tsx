import { useEffect } from 'react';
import { useContacts } from '../../hooks/useContacts';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { EmptyState } from '../ui/EmptyState';
import { ErrorState } from '../ui/ErrorState';
import { formatDate } from '../../lib/utils';
import { useState } from 'react';
import { Modal } from '../ui/Modal';
import type { Contact } from '../../types/contact';

export function ContactsTable() {
  const { contacts, status, error, fetchContacts, markAsRead } = useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (status === 'error') {
    return <ErrorState message={error || 'Failed to load contacts'} onRetry={fetchContacts} />;
  }

  if (contacts.length === 0) {
    return (
      <EmptyState
        title="No contacts yet"
        description="Contact form submissions will appear here."
      />
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-navy-700/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-700/50 bg-navy-800/50">
              <th className="px-4 py-3 text-left font-medium text-navy-300">Name</th>
              <th className="px-4 py-3 text-left font-medium text-navy-300">Email</th>
              <th className="px-4 py-3 text-left font-medium text-navy-300 hidden md:table-cell">
                Subject
              </th>
              <th className="px-4 py-3 text-left font-medium text-navy-300">Status</th>
              <th className="px-4 py-3 text-left font-medium text-navy-300 hidden lg:table-cell">
                Date
              </th>
              <th className="px-4 py-3 text-right font-medium text-navy-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-700/50">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className={`hover:bg-navy-800/30 transition-colors ${
                  !contact.is_read ? 'bg-primary-500/5' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {!contact.is_read && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-primary-400" />
                    )}
                    <span className="font-medium text-white">{contact.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-navy-400">{contact.email}</td>
                <td className="px-4 py-3 text-navy-400 hidden md:table-cell max-w-[200px] truncate">
                  {contact.subject}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={contact.is_read ? 'default' : 'info'}>
                    {contact.is_read ? 'Read' : 'New'}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-navy-400 hidden lg:table-cell">
                  {formatDate(contact.created_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedContact(contact)}
                    >
                      View
                    </Button>
                    {!contact.is_read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(contact.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        title="Contact Details"
      >
        {selectedContact && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-navy-400">Name</p>
                <p className="text-sm text-white">{selectedContact.name}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400">Email</p>
                <p className="text-sm text-white">{selectedContact.email}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400">Phone</p>
                <p className="text-sm text-white">{selectedContact.phone}</p>
              </div>
              <div>
                <p className="text-xs text-navy-400">Subject</p>
                <p className="text-sm text-white">{selectedContact.subject}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-navy-400 mb-1">Message</p>
              <p className="text-sm text-navy-200 bg-navy-900/50 rounded-lg p-3">
                {selectedContact.message}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
