import React, { useEffect, useRef } from 'react';
import { TrendingDown, Clock, FileCheck, Users, Zap, Shield, BarChart3, Globe } from 'lucide-react';

const benefits = [
  {
    icon: TrendingDown,
    title: '78% Fewer Violations',
    description: 'AI-powered compliance tracking and proactive alerts dramatically reduce inspection violations.',
    metric: '78%',
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    icon: Clock,
    title: '60% Faster Inspections',
    description: 'Digital checklists and mobile tools cut inspection time in half while improving accuracy.',
    metric: '60%',
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    icon: FileCheck,
    title: 'Instant Compliance Reports',
    description: 'Auto-generated regulatory reports for NBC, NFPA, and local fire department requirements.',
    metric: '100%',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: Users,
    title: 'Team Coordination',
    description: 'Real-time emergency coordination across safety officers, technicians, and response teams.',
    metric: '3x',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: Zap,
    title: 'Faster Emergency Response',
    description: 'Instant SOS alerts and incident dashboard get response teams mobilized 4x faster.',
    metric: '4x',
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    icon: Shield,
    title: 'Risk Reduction',
    description: 'Predictive AI identifies risks before they become incidents, preventing fires proactively.',
    metric: '85%',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description: 'Comprehensive analytics transform raw safety data into actionable executive insights.',
    metric: '360°',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
  {
    icon: Globe,
    title: 'Multi-Facility Visibility',
    description: 'Manage 100s of facilities from a single platform with role-based access and centralized oversight.',
    metric: '∞',
    color: 'text-teal-500',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
  },
];

const BenefitsSection: React.FC = () => {
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
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            Proven Results
          </div>
          <h2 className="section-title mb-4">
            Real Impact,
            <span className="gradient-fire-text"> Measurable Results</span>
          </h2>
          <p className="section-subtitle">
            Organizations using AgniSutra report dramatic improvements in safety compliance, operational efficiency, and emergency readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="scroll-reveal stagger-child group p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${benefit.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${benefit.color}`} />
                  </div>
                  <span className={`text-2xl font-black ${benefit.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {benefit.metric}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 text-sm leading-tight">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Big Statement */}
        <div className="mt-16 scroll-reveal">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-red-950/50 to-slate-900 p-10 md:p-16 text-center border border-red-900/30">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-orange-600/5" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Every minute of delay in fire response
                <span className="block gradient-fire-text">increases damage by 40%</span>
              </h3>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                AgniSutra's real-time monitoring and instant alert system ensures your team responds in seconds, not minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
