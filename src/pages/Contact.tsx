import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Users, Headphones } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', org: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.message.trim() || form.message.length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success('Message sent! We\'ll respond within 24 hours.');
  };

  const contactInfo = [
    { icon: Mail, label: 'Email Us', value: 'hello@agnisutra.com', href: 'mailto:hello@agnisutra.com' },
    { icon: Phone, label: 'Call Us', value: '+91 800 000 0000', href: 'tel:+918000000000' },
    { icon: MapPin, label: 'Visit Us', value: 'Mumbai, Maharashtra, India', href: '#' },
    { icon: Clock, label: 'Support Hours', value: '24/7 Emergency · 9AM–6PM IST Business', href: '#' },
  ];

  const channels = [
    { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our team in real-time during business hours.' },
    { icon: Headphones, title: 'Phone Support', desc: 'Call us directly for urgent matters or technical support.' },
    { icon: Users, title: 'Sales Consultation', desc: 'Book a personalized demo for your organization.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                <Mail className="w-4 h-4" />
                Get In Touch
              </div>
              <h1 className="section-title mb-4">
                We're Here to
                <span className="gradient-fire-text"> Help You Stay Safe</span>
              </h1>
              <p className="section-subtitle">Have questions or need a demo? Our team responds within 24 hours.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Contact Information</h2>
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.label} href={item.href} className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all group">
                      <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                        <Icon className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium">{item.value}</p>
                      </div>
                    </a>
                  );
                })}

                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold mb-4">Other Ways to Reach Us</h3>
                  <div className="space-y-4">
                    {channels.map((ch) => {
                      const Icon = ch.icon;
                      return (
                        <div key={ch.title} className="flex items-start gap-3">
                          <Icon className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{ch.title}</p>
                            <p className="text-xs text-muted-foreground">{ch.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-2xl p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">We'll get back to you within 24 hours. Check your email for confirmation.</p>
                      <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', org: '', phone: '', subject: '', message: '' }); }}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                          <input className="input-field" placeholder="John Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Email Address *</label>
                          <input type="email" className="input-field" placeholder="john@company.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Organization</label>
                          <input className="input-field" placeholder="Your Company Name" value={form.org} onChange={e => setForm(p => ({ ...p, org: e.target.value }))} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                          <input className="input-field" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Subject</label>
                        <select className="input-field" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}>
                          <option value="">Select a subject</option>
                          <option value="demo">Request a Demo</option>
                          <option value="pricing">Pricing Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Message *</label>
                        <textarea className="input-field min-h-[120px] resize-none" placeholder="Tell us about your fire safety needs, facility size, and how we can help..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                      </div>
                      <Button type="submit" className="w-full gradient-fire text-white border-0 hover:opacity-90" disabled={submitting}>
                        {submitting ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> Sending...</>
                        ) : (
                          <><Send className="w-4 h-4 mr-2" /> Send Message</>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
