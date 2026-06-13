import { useState, useCallback } from 'react';
import api from '../lib/axios';
import type { Contact, ContactPayload } from '../types/contact';
import type { ApiResponse } from '../types/api';
import type { AsyncStatus } from '../types/api';

interface UseContactsReturn {
  contacts: Contact[];
  unreadCount: number;
  status: AsyncStatus;
  error: string | null;
  fetchContacts: () => Promise<void>;
  submitContact: (payload: ContactPayload) => Promise<boolean>;
  markAsRead: (id: number) => Promise<boolean>;
}

export function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const unreadCount = contacts.filter((c) => !c.is_read).length;

  const fetchContacts = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get<ApiResponse<Contact[]>>('/api/contacts');
      setContacts(res.data.data);
      setStatus('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to fetch contacts';
      setError(message);
      setStatus('error');
    }
  }, []);

  const submitContact = useCallback(async (payload: ContactPayload): Promise<boolean> => {
    try {
      await api.post('/api/contacts', payload);
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to submit contact';
      setError(message);
      return false;
    }
  }, []);

  const markAsRead = useCallback(async (id: number): Promise<boolean> => {
    try {
      await api.patch(`/api/contacts/${id}/read`);
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_read: true } : c)),
      );
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to mark as read';
      setError(message);
      return false;
    }
  }, []);

  return { contacts, unreadCount, status, error, fetchContacts, submitContact, markAsRead };
}
