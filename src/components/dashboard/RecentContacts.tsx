import { useEffect } from 'react';
import { useContacts } from '../../hooks/useContacts';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { formatDate } from '../../lib/utils';

export function RecentContacts() {
  const { contacts, status, fetchContacts, markAsRead } = useContacts();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const recentContacts = contacts.slice(0, 5);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white font-display mb-4">
        Recent Contacts
      </h3>

      {status === 'loading' && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}

      {status === 'success' && recentContacts.length === 0 && (
        <p className="text-sm text-navy-400 text-center py-8">No contacts yet.</p>
      )}

      {status === 'success' && recentContacts.length > 0 && (
        <div className="space-y-3">
          {recentContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-start justify-between rounded-lg bg-navy-800/50 p-3 transition-colors hover:bg-navy-700/50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    {contact.name}
                  </span>
                  {!contact.is_read && (
                    <span className="h-2 w-2 rounded-full bg-primary-400" />
                  )}
                </div>
                <p className="text-xs text-navy-400 mt-0.5">{contact.subject}</p>
                <p className="text-xs text-navy-500 mt-1">{formatDate(contact.created_at)}</p>
              </div>
              {!contact.is_read && (
                <button
                  onClick={() => markAsRead(contact.id)}
                  className="text-xs text-primary-400 hover:text-primary-300 transition-colors whitespace-nowrap"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-400 text-center py-8">
          Failed to load contacts.
        </p>
      )}
    </Card>
  );
}
