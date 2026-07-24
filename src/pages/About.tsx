import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Flame, Target, Eye, Users, Award, Globe, Shield, Zap, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const team = [
  { name: 'Vikram Nair', role: 'CEO & Co-Founder', expertise: 'Fire Safety Expert · 20 years', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram' },
  { name: 'Priya Sharma', role: 'CTO', expertise: 'AI/ML & IoT Systems', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaS' },
  { name: 'Arjun Mehta', role: 'Head of Product', expertise: 'Enterprise SaaS', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunM' },
  { name: 'Deepika Rao', role: 'VP Safety Operations', expertise: 'NBC & NFPA Standards', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepika' },
  { name: 'Rohit Gupta', role: 'Head of Engineering', expertise: 'Distributed Systems', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit' },
  { name: 'Kavitha Singh', role: 'Head of Customer Success', expertise: 'Enterprise Onboarding', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavitha' },
];

const milestones = [
  { year: '2021', event: 'AgniSutra founded in Mumbai by fire safety and technology experts.' },
  { year: '2022', event: 'Launched V1.0 with equipment management and digital inspections. First 50 clients.' },
  { year: '2023', event: 'AI risk assessment and IoT integration launched. Series A funding secured.' },
  { year: '2024', event: 'GIS mapping, emergency response module. Expanded to 500+ facilities.' },
  { year: '2025', event: 'Full AI Safety Suite. 2,500+ facilities, 18 states, enterprise expansion.' },
];

const About: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const elements = section.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main ref={sectionRef as any}>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="scroll-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium mb-6">
              <Flame className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="scroll-reveal section-title mb-6">
              Built by Fire Safety Experts,
              <span className="gradient-fire-text"> Powered by AI</span>
            </h1>
            <p className="scroll-reveal text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              AgniSutra was born from a simple but urgent truth: fire safety in India was still largely manual, reactive, and disconnected. We set out to change that with technology.
            </p>
            <div className="scroll-reveal flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-fire text-white border-0" size="lg" onClick={() => navigate('/register')}>
                Join Our Mission
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
                Partner With Us
              </Button>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Eye, title: 'Our Vision', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', content: 'To make every building, workplace, and community in India — and the world — safer through intelligent fire prevention and emergency response technologies.' },
                { icon: Target, title: 'Our Mission', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', content: 'Improve fire safety compliance, reduce fire-related risks, digitize inspection and maintenance, enable faster emergency response, and leverage AI for predictive risk analysis.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="scroll-reveal bg-card border border-border rounded-2xl p-8">
                    <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '2,500+', label: 'Facilities Protected' },
                { value: '50K+', label: 'Equipment Items Tracked' },
                { value: '18', label: 'States Covered' },
                { value: '99.9%', label: 'Platform Uptime' },
              ].map((stat) => (
                <div key={stat.label} className="scroll-reveal">
                  <div className="text-3xl md:text-4xl font-black gradient-fire-text mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Every decision we make is guided by these principles.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: 'Safety First', desc: 'Every feature is designed with one goal: protecting lives and property.' },
                { icon: Zap, title: 'Speed & Reliability', desc: 'In emergency scenarios, every second counts. We build for speed.' },
                { icon: Heart, title: 'Human Impact', desc: 'Technology serves people. We keep the human element at the center of everything.' },
                { icon: Globe, title: 'Accessibility', desc: 'Fire safety tools should be available to every organization, regardless of size.' },
                { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standards of quality and compliance.' },
                { icon: Users, title: 'Community', desc: 'Building safer communities together with our customers and partners.' },
              ].map((val) => {
                const Icon = val.icon;
                return (
                  <div key={val.title} className="scroll-reveal stagger-child bg-card border border-border rounded-xl p-6">
                    <Icon className="w-8 h-8 text-red-500 mb-4" />
                    <h4 className="font-semibold mb-2">{val.title}</h4>
                    <p className="text-sm text-muted-foreground">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Industry experts, technologists, and safety professionals united by a common mission.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member) => (
                <div key={member.name} className="scroll-reveal stagger-child bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:shadow-lg transition-all">
                  <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full bg-muted flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-red-500">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.expertise}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 scroll-reveal">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            </div>
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={m.year} className="scroll-reveal stagger-child flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 gradient-fire rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                  </div>
                  <div className="pb-6">
                    <p className="font-bold text-red-500 mb-1">{m.year}</p>
                    <p className="text-sm text-muted-foreground">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-reveal">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
            <p className="text-muted-foreground mb-8">Start your free trial and see why 2,500+ facilities trust AgniSutra.</p>
            <Button className="gradient-fire text-white border-0 hover:opacity-90" size="lg" onClick={() => navigate('/register')}>
              Start Free Trial — No Credit Card
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
