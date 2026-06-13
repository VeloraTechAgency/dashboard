import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const success = await login(form);
    if (success) navigate('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <img src="/logo_velora.png" alt="VeloraTech" className="h-10 w-10" />
          </Link>
          <h1 className="text-2xl font-bold text-white font-display">
            Welcome back
          </h1>
          <p className="text-navy-400 mt-1 text-sm">
            Sign in to your dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-navy-700/50 bg-navy-800/50 p-6 space-y-4 backdrop-blur-sm"
        >
          <Input
            label="Email"
            type="email"
            placeholder="admin@veloratech.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            required
          />

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <Button type="submit" loading={loading} className="w-full">
            Sign In
          </Button>

          <p className="text-center text-xs text-navy-500 mt-4">
            Demo: admin@veloratech.com / password
          </p>
        </form>
      </div>
    </div>
  );
}
