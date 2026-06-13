import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-navy-900">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
