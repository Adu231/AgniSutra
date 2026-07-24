import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ClipboardCheck, AlertTriangle, Siren, Wifi, MapPin, GraduationCap, BarChart3, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Flame,
    title: 'Fire Equipment Management',
    description: 'Track extinguishers, hydrants, alarms, and detectors with QR codes and real-time status monitoring across all floors.',
    color: 'text-red-500',
    bg: 'bg-red-500/10 dark:bg-red-500/20',
    border: 'border-red-500/20',
  },
  {
    icon: ClipboardCheck,
    title: 'AI Inspection & Compliance',
    description: 'Automate inspections with AI-powered checklists, violation tracking, and regulatory compliance for NBC, NFPA, and TAC.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10 dark:bg-orange-500/20',
    border: 'border-orange-500/20',
  },
  {
    icon: AlertTriangle,
    title: 'AI Risk Assessment',
    description: 'Identify fire hazards with AI-driven risk scoring, heat map visualization, and predictive incident forecasting.',
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-500/10 dark:bg-yellow-500/20',
    border: 'border-yellow-500/20',
  },
  {
    icon: Siren,
    title: 'Emergency Response',
    description: 'Coordinate emergencies with SOS alerts, live incident dashboards, evacuation plans, and team coordination tools.',
    color: 'text-red-600',
    bg: 'bg-red-600/10 dark:bg-red-600/20',
    border: 'border-red-600/20',
  },
  {
    icon: Wifi,
    title: 'IoT Smart Monitoring',
    description: 'Real-time monitoring of smoke detectors, heat sensors, gas detectors, water levels, and pump status with instant alerts.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    border: 'border-blue-500/20',
  },
  {
    icon: MapPin,
    title: 'GIS Emergency Mapping',
    description: 'Location-aware emergency intelligence with fire zone mapping, escape routes, assembly points, and nearby fire stations.',
    color: 'text-green-500',
    bg: 'bg-green-500/10 dark:bg-green-500/20',
    border: 'border-green-500/20',
  },
  {
    icon: GraduationCap,
    title: 'Employee Training',
    description: 'Fire safety courses, evacuation training, mock drill scheduling, online assessments, and certification tracking.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    border: 'border-purple-500/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Executive dashboards, compliance analytics, equipment health reports, and incident trend analysis for data-driven decisions.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    border: 'border-cyan-500/20',
  },
  {
    icon: Shield,
    title: 'Preventive Maintenance',
    description: 'Manage AMC contracts, schedule maintenance, assign technicians, and track service history with warranty management.',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10 dark:bg-teal-500/20',
    border: 'border-teal-500/20',
  },
];

const FeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    cards.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef as any} id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            Complete Fire Safety Ecosystem
          </div>
          <h2 className="section-title mb-4">
            Everything You Need for
            <span className="gradient-fire-text"> Complete Fire Safety</span>
          </h2>
          <p className="section-subtitle">
            12 powerful modules working together to protect your facilities, ensure compliance,
            and enable rapid emergency response.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`scroll-reveal stagger-child group p-6 rounded-2xl border ${feature.border} bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default`}
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 scroll-reveal">
          <Button
            className="gradient-fire text-white border-0 hover:opacity-90 group"
            size="lg"
            onClick={() => navigate('/features')}
          >
            Explore All Features
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
