import { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { formatDate } from '../../lib/utils';
import { cn } from '../../lib/utils';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-lg p-2 text-navy-400 hover:text-white hover:bg-navy-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-navy-600/50 bg-navy-800 shadow-2xl shadow-black/50 overflow-hidden">
          <div className="flex items-center justify-between border-b border-navy-700/50 px-4 py-3">
            <h3 className="text-sm font-semibold text-white font-display">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-navy-400">No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 10).map((n) => (
                <button
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={cn(
                    'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-navy-700/50',
                    !n.is_read && 'bg-primary-500/5',
                  )}
                >
                  <div
                    className={cn(
                      'mt-1 h-2 w-2 shrink-0 rounded-full',
                      n.is_read ? 'bg-transparent' : 'bg-primary-400',
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="text-xs text-navy-400 mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-navy-500 mt-1">
                      {formatDate(n.created_at)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
