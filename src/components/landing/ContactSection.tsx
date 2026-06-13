import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { useContacts } from '../../hooks/useContacts';
import type { ContactPayload } from '../../types/contact';

export function ContactSection() {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { submitContact, error } = useContacts();
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const success = await submitContact(formData);
    setLoading(false);
    if (success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 via-transparent to-transparent" />
      <div className="absolute top-1/4 -left-32 h-80 w-80 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-primary-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1 text-xs font-medium text-primary-400">
                Get In Touch
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-display">
                Let&apos;s Work Together
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-navy-300 max-w-md">
                Ready to transform your business? Get in touch with us and
                let&apos;s discuss your next project.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-4">
                {[
                  { icon: '📧', label: 'Email', value: 'hello@veloratech.com' },
                  { icon: '📞', label: 'Phone', value: '+62 812 3456 7890' },
                  { icon: '📍', label: 'Location', value: 'Jakarta, Indonesia' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs text-navy-400">{item.label}</p>
                      <p className="text-sm text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                <span className="text-4xl mb-4 block">🎉</span>
                <h3 className="text-lg font-semibold text-emerald-400 font-display">
                  Message Sent!
                </h3>
                <p className="text-sm text-navy-300 mt-2">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    label="Name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="phone"
                    label="Phone"
                    placeholder="081234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="subject"
                    label="Subject"
                    placeholder="Partnership Opportunity"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <TextArea
                  name="message"
                  label="Message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
                <Button type="submit" loading={loading} className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
