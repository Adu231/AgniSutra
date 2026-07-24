import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTABanner: React.FC = () => {
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
    <section ref={sectionRef as any} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="scroll-reveal relative overflow-hidden rounded-3xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-red-950 to-slate-900" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />

          <div className="relative z-10 text-center py-20 px-6 sm:px-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-sm font-medium mb-8">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-400 animate-ping" />
              </div>
              Free 14-Day Trial · No Credit Card Required
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Start Protecting Your
              <span className="block gradient-fire-text">Facilities Today</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Join 2,500+ organizations using AgniSutra to monitor fire safety, automate compliance, and respond faster to emergencies.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="gradient-fire text-white border-0 text-base font-semibold px-10 py-4 h-auto fire-glow hover:scale-105 transition-all group"
                onClick={() => navigate('/register')}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-base px-10 py-4 h-auto"
                onClick={() => navigate('/contact')}
              >
                Talk to Sales
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { icon: Zap, text: 'Setup in under 30 minutes' },
                { icon: Shield, text: 'SOC 2 Type II Certified' },
                { icon: ArrowRight, text: 'Cancel anytime, no lock-in' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center justify-center gap-2 text-white/60 text-sm">
                    <Icon className="w-4 h-4 text-green-400" />
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
