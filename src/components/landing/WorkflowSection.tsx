import React, { useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Building2, Search, ClipboardList, AlertTriangle, BarChart3 } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Building2,
    title: 'Register Your Facility',
    description: 'Set up your organization, map building floors, register fire safety assets, and configure zone mapping.',
    details: ['Multi-facility support', 'Floor plan uploads', 'Asset registration with QR codes', 'Zone & occupancy mapping'],
    color: 'text-red-500',
    bg: 'from-red-500/20 to-red-600/10',
  },
  {
    step: '02',
    icon: Search,
    title: 'Monitor & Detect',
    description: 'Real-time IoT monitoring detects anomalies across smoke sensors, heat detectors, and gas monitors.',
    details: ['Live IoT dashboard', 'Instant anomaly alerts', 'Equipment health tracking', 'Automated status updates'],
    color: 'text-orange-500',
    bg: 'from-orange-500/20 to-orange-600/10',
  },
  {
    step: '03',
    icon: ClipboardList,
    title: 'Inspect & Comply',
    description: 'AI-assisted inspections with digital checklists, violation tracking, and automatic compliance reporting.',
    details: ['AI inspection assistant', 'Digital checklists', 'Violation tracking', 'Auto-generated reports'],
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'from-yellow-500/20 to-yellow-600/10',
  },
  {
    step: '04',
    icon: AlertTriangle,
    title: 'Assess & Prevent',
    description: 'AI risk scoring with heat maps identifies critical zones and provides prioritized safety recommendations.',
    details: ['Fire risk scoring', 'Heat map visualization', 'Predictive analytics', 'AI recommendations'],
    color: 'text-blue-500',
    bg: 'from-blue-500/20 to-blue-600/10',
  },
  {
    step: '05',
    icon: BarChart3,
    title: 'Report & Improve',
    description: 'Executive dashboards and detailed reports give leadership the insights needed to continuously improve safety.',
    details: ['Executive dashboards', 'Compliance scorecards', 'Trend analysis', 'Custom report generation'],
    color: 'text-green-500',
    bg: 'from-green-500/20 to-green-600/10',
  },
];

const WorkflowSection: React.FC = () => {
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
    <section ref={sectionRef as any} className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium mb-4">
            <ArrowRight className="w-4 h-4" />
            How It Works
          </div>
          <h2 className="section-title mb-4">
            Your Complete
            <span className="gradient-fire-text"> Safety Workflow</span>
          </h2>
          <p className="section-subtitle">
            From facility setup to intelligent reporting — a seamless 5-step workflow that keeps your organization safe and compliant.
          </p>
        </div>

        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="scroll-reveal stagger-child relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" style={{ width: 'calc(100% - 3rem)' }} />
                )}
                <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.bg} border border-border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <div className={`text-4xl font-black ${step.color} opacity-20 mb-2`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.description}</p>
                  <ul className="space-y-1.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${step.color}`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
