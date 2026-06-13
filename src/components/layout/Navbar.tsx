import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useUIStore } from '../../stores/uiStore';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/#services', label: 'Services' },
  { path: '/#projects', label: 'Projects' },
  { path: '/#testimonials', label: 'Testimonials' },
  { path: '/#contact', label: 'Contact' },
];

export function Navbar() {
  const location = useLocation();
  const { activeNav, setActiveNav } = useUIStore();

  useEffect(() => {
    const sectionIds = ['services', 'projects', 'testimonials', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveNav(`/#${id}`);
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    const handleScroll = () => {
      if (window.scrollY < 300) {
        setActiveNav('/');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (location.hash) {
      setActiveNav(`/${location.hash}`);
    } else if (window.scrollY < 300) {
      setActiveNav('/');
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.hash, setActiveNav]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-navy-800/50 bg-navy-900/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setActiveNav('/')}>
            <img src="/logo_velora.png" alt="VeloraTech" className="h-8 w-8" />
            <span className="text-lg font-bold text-white font-display">
              Velora<span className="text-primary-400">Tech</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={() => setActiveNav(link.path)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  activeNav === link.path
                    ? 'text-primary-400'
                    : 'text-navy-300 hover:text-white',
                )}
              >
                {link.label}
                {activeNav === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-primary-500/10 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
