import { useCallback, useEffect } from 'react';
import { useNotificationStore } from '../stores/notificationStore';
import { useContacts } from './useContacts';
import { useInterval } from './useInterval';
import { useAuthStore } from '../stores/authStore';
import type { Notification } from '../types/notification';

export function useNotifications() {
  const {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    setNotifications,
  } = useNotificationStore();

  const { contacts, fetchContacts } = useContacts();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const checkForNewContacts = useCallback(() => {
    if (!isAuthenticated) return;
    fetchContacts();
  }, [isAuthenticated, fetchContacts]);

  useInterval(checkForNewContacts, isAuthenticated ? 30000 : null);

  useEffect(() => {
    if (!isAuthenticated || contacts.length === 0) return;

    const unreadContacts = contacts.filter((c) => !c.is_read);
    const existingNotificationIds = new Set(
      notifications
        .filter((n) => n.type === 'info')
        .map((n) => n.id),
    );

    for (const contact of unreadContacts) {
      const notificationId = `contact-${contact.id}`;
      if (!existingNotificationIds.has(notificationId)) {
        const newNotification: Notification = {
          id: notificationId,
          title: 'New Contact Message',
          message: `${contact.name} sent a message: "${contact.message.slice(0, 60)}${contact.message.length > 60 ? '...' : ''}"`,
          type: 'info',
          is_read: false,
          created_at: contact.created_at,
        };
        addNotification(newNotification);
      }
    }
  }, [contacts, isAuthenticated, notifications, addNotification]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    setNotifications,
  };
}
