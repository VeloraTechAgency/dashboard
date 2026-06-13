export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function getIconComponent(iconName: string): string {
  const iconMap: Record<string, string> = {
    cloud: '☁️',
    code: '💻',
    design: '🎨',
    mobile: '📱',
    seo: '🔍',
    marketing: '📊',
    security: '🔒',
    support: '🎧',
    default: '⚙️',
  };
  return iconMap[iconName] || iconMap.default;
}
