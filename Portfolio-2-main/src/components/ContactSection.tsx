import React, { useState } from 'react';
import { ContactCard } from '@/components/ui/contact-card';
import { Mail as MailIcon, Phone as PhoneIcon, MapPin as MapPinIcon, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SplitText from './SplitText';

export const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [botcheck, setBotcheck] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (botcheck) return; // Silent discard for automated bot submissions
    setStatus('loading');
    setErrorMessage('');

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'b080b6d1-9ef6-4635-b850-dd71babe51ae';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: `New Contact Message from ${formData.name} - Portfolio`,
          from_name: 'Portfolio Contact Form',
          botcheck: botcheck,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please check your connection.');
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 sm:py-36 bg-black z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-20">
          <SplitText
            text="LET'S CONNECT"
            tag="h2"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#EAE6E1] uppercase mb-4 whitespace-nowrap"
            delay={40}
            duration={0.65}
            animationFrom={{ opacity: 0, y: 50, scale: 0.95 }}
            animationTo={{ opacity: 1, y: 0, scale: 1 }}
          />
          <p
            className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#C4C4C8] uppercase max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
          >
            HAVE AN IDEA OR A PROJECT IN MIND? REACH OUT AND LET'S BUILD SOMETHING GREAT TOGETHER.
          </p>
        </div>

        <ContactCard
            title="Get in touch"
            description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
            contactInfo={[
              {
                icon: MailIcon,
                label: 'Email',
                value: 'sumit.biswas.pmi.9c@gmail.com',
              },
              {
                icon: PhoneIcon,
                label: 'Phone',
                value: '+91 8017259570',
              },
              {
                icon: MapPinIcon,
                label: 'Address',
                value: 'Kolkata, West Bengal',
                className: 'col-span-2',
              },
            ]}
            className="rounded-2xl border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl overflow-hidden"
            formSectionClassName="bg-white/[0.02] border-white/10"
          >
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              {/* Anti-spam Botcheck Honeypot (Invisible to real users) */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-slate-200">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-pink-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-pink-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone" className="text-slate-200">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 __________"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-pink-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-slate-200">Message</Label>
                <Textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-pink-400 resize-none"
                />
              </div>
              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-300 bg-red-950/40 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                className="w-full bg-white hover:bg-slate-200 text-black font-semibold tracking-wide transition-all duration-300 py-3 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Message Sent Successfully! </span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </ContactCard>
      </div>
    </section>
  );
};

export default ContactSection;
