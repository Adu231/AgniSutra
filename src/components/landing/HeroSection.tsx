import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, BarChart3, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';
import { useAuth } from '@/contexts/AuthContext';

const ROTATING_WORDS = ['Faster', 'Smarter', 'Safer', 'Proactive', 'Intelligent'];
const ROTATING_FOR = ['Facilities', 'Industries', 'Hospitals', 'Airports', 'Fire Teams'];

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [wordIndex, setWordIndex] = useState(0);
  const [forIndex, setForIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleStartTrial = () => {
    if (isAuthenticated) {
      navigate('/dashboard/admin/subscriptions/payment?org=DLF%20Commercial%20Properties&plan=professional');
    } else {
      navigate('/register');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex(prev => (prev + 1) % ROTATING_WORDS.length);
        setForIndex(prev => (prev + 1) % ROTATING_FOR.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-0 sm:pb-0">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="AgniSutra Command Center"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/70 to-slate-900/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-transparent to-orange-950/20" />
      </div>

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-red-500/40 bg-red-500/10 backdrop-blur-sm text-red-300 text-xs sm:text-sm font-medium mb-8 animate-slide-up">
          <div className="relative flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="absolute w-2 h-2 rounded-full bg-red-400 animate-ping" />
          </div>
          <span className="hidden sm:inline">AI-Powered Fire Safety Platform · Trusted by 2,500+ Facilities</span>
          <span className="inline sm:hidden">AI-Powered Fire Safety Platform</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-slide-up"
          style={{ animationDelay: '0.1s', fontFamily: 'Space Grotesk, sans-serif' }}>
          Fire Safety Made{' '}
          <span
            className="inline-block min-w-[130px] sm:min-w-[280px] transition-all duration-300"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-10px)' }}
          >
            <span className="gradient-fire-text">{ROTATING_WORDS[wordIndex]}</span>
          </span>
        </h1>

        <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white/80 mb-6 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          Built for{' '}
          <span
            className="inline-block min-w-[100px] sm:min-w-[220px] transition-all duration-300 text-orange-400"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-10px)' }}
          >
            {ROTATING_FOR[forIndex]}
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          AgniSutra unifies fire equipment management, AI inspections, IoT monitoring,
          emergency response, and compliance — in one intelligent platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Button
            size="lg"
            className="gradient-fire text-white border-0 text-base font-semibold px-8 py-4 h-auto fire-glow hover:scale-105 transition-all duration-300 group"
            onClick={handleStartTrial}
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white/30 text-white hover:text-white hover:bg-white/10 hover:border-white/50 text-base px-8 py-4 h-auto backdrop-blur-sm group"
            onClick={() => navigate('/features')}
          >
            <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            See How It Works
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '2,500+', label: 'Facilities Protected' },
            { value: '50K+', label: 'Equipment Tracked' },
            { value: '99.9%', label: 'Platform Uptime' },
            { value: '78%', label: 'Compliance Improvement' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-60 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          {['NBC Compliant', 'NFPA Standards', 'ISO 9001', 'SOC 2 Type II', 'GDPR Ready'].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-white/70 text-sm">
              <Shield className="w-3.5 h-3.5 text-green-400" />
              {badge}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs animate-bounce">
        <span>Scroll to explore</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
};

export default HeroSection;
