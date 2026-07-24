import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Building2, Factory, HeartPulse, GraduationCap, ShieldCheck, Flame, ArrowLeft, ArrowRight, Zap, Target, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SolutionConfig {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  stats: { label: string; value: string }[];
  features: { title: string; desc: string }[];
  accentColor: string;
}

const solutionConfigs: Record<string, SolutionConfig> = {
  commercial: {
    title: 'Commercial Buildings & Retail Solutions',
    subtitle: 'AgniSutra Enterprise Safety Suite for High-Rises & Office Parks',
    icon: Building2,
    description: 'Ensure safety compliance and guard occupants in commercial offices, shopping malls, and corporate parks. Leverage automated risk profiles and dynamic evacuation routing to minimize liability and response latency.',
    stats: [
      { label: 'Deployment ETA', value: '48 Hours' },
      { label: 'Sensors Managed', value: '12,000+' },
      { label: 'Evac Speed Index', value: '+35% faster' },
    ],
    features: [
      { title: 'Dynamic Exit Pathing', desc: 'Real-time routing shifts egress directions away from detector heat patterns.' },
      { title: 'Multi-Tenant Dashboards', desc: 'Separate portals for safety officers, occupants, and security teams.' },
      { title: 'Auto-Compliance Filings', desc: 'Generates localized fire marshal compliance audit reports in seconds.' },
    ],
    accentColor: 'from-amber-500 to-red-600',
  },
  manufacturing: {
    title: 'Manufacturing & Industrial Facilities',
    subtitle: 'Hazard Containment & Process Guarding for Industrial Sectors',
    icon: Factory,
    description: 'High-risk manufacturing zones demand rapid suppression coordination. AgniSutra integrates with heavy machinery, gas detection systems, and factory suppression nodes to prevent catastrophic failures.',
    stats: [
      { label: 'Hazmat Safe Index', value: '99.99%' },
      { label: 'Avg System Response', value: '< 2.5 Sec' },
      { label: 'Industrial Deployments', value: '450+ Sites' },
    ],
    features: [
      { title: 'Thermal IoT Monitoring', desc: 'Tracks motor heat and electrical cabinets before ignition occurs.' },
      { title: 'Gas Leak Alarm Isolation', desc: 'Automated solenoid cutoff valves shut down lines when gas levels spike.' },
      { title: 'Response Team Radios', desc: 'Instantly dispatches local emergency response units via integrated radio hubs.' },
    ],
    accentColor: 'from-orange-500 to-red-700',
  },
  healthcare: {
    title: 'Healthcare & Hospital Facilities',
    subtitle: 'Patience Guarding & Secure Life Safety Evacuations',
    icon: HeartPulse,
    description: 'Evacuation in healthcare is unique due to non-ambulatory patients. AgniSutra coordinates localized compartment containment strategies to safeguard critical patient wards.',
    stats: [
      { label: 'Patient Safety Rate', value: '100% Guarded' },
      { label: 'Air Quality Check', value: 'Continuous' },
      { label: 'Hospital Clients', value: '120+ Hospitals' },
    ],
    features: [
      { title: 'Zonal Containment Alerts', desc: 'Alerts staff to close critical compartmental fire doors instantly.' },
      { title: 'HVAC Air Purification', desc: 'Shuts down air circulation to contain toxic smoke particles.' },
      { title: 'Vulnerable Patient Index', desc: 'Integrates with ward databases to direct responders to non-ambulatory rooms.' },
    ],
    accentColor: 'from-rose-500 to-pink-600',
  },
  educational: {
    title: 'Educational Institutes & Campuses',
    subtitle: 'Next-Gen Safety for Schools, Colleges & Campus Auditoriums',
    icon: GraduationCap,
    description: 'Protect thousands of students and faculty with unified safety systems. Implement drill managers and real-time campus broadcasts to establish emergency readiness.',
    stats: [
      { label: 'Student Safety Rate', value: 'Zero Incident' },
      { label: 'Drill Completion', value: '100%' },
      { label: 'Campus Coverage', value: '85 Universities' },
    ],
    features: [
      { title: 'Unified Campus Audio', desc: 'Broadcasts evacuation directives across all campus speakers automatically.' },
      { title: 'Automated Drill Tracker', desc: 'Configures recurring inspection schedules and evacuation drills.' },
      { title: 'Panic Alarms Portal', desc: 'Integrates with classroom lock buttons and emergency call box systems.' },
    ],
    accentColor: 'from-blue-500 to-indigo-600',
  },
  'fire-departments': {
    title: 'Fire Department Dispatch Coordination',
    subtitle: 'Connected Dispatch & Building Intelligence for First Responders',
    icon: ShieldCheck,
    description: 'Streamline communications between emergency command centers and on-scene firefighters. Access real-time structural blueprints, hazmat logs, and occupancy charts on-the-fly.',
    stats: [
      { label: 'Dispatch Latency', value: '< 900ms' },
      { label: 'Responder Sync', value: 'Real-Time' },
      { label: 'Municipal Stations', value: '80+ Cities' },
    ],
    features: [
      { title: 'Interactive Route Maps', desc: 'Floor plan overlays trace routes from nearest fire hydrants to incident origin.' },
      { title: 'Active Unit Telemetry', desc: 'Tracks tender water levels, crew counts, and radio connection frequencies.' },
      { title: 'Building Database Integration', desc: 'Accesses structural blueprint specifications before arriving on scene.' },
    ],
    accentColor: 'from-red-600 to-rose-700',
  },
};

const SolutionDetail: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const config = solutionConfigs[type || 'commercial'] || solutionConfigs.commercial;
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 bg-slate-950 text-white text-left">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.accentColor} flex items-center justify-center shadow-lg`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-red-400">AgniSutra Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight max-w-3xl leading-tight">
              {config.title}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl font-light mb-8">
              {config.subtitle}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
              {config.stats.map(stat => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-2xl font-black text-amber-500" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{config.title.includes('Fire') && stat.label.includes('Latency') ? <span className="animate-pulse">{stat.value}</span> : stat.value}</p>
                  <p className="text-xs text-slate-300 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features list */}
        <section className="py-20 bg-background text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight mb-6">
                  Engineered for Maximum Safety & Compliance
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {config.description} AgniSutra integrates directly into building subsystems, providing continuous diagnostic tracking and smart incident dispatch protocols.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0"><Zap className="w-5 h-5 text-green-500" /></div>
                    <div>
                      <p className="font-semibold text-sm">Automated Instant Alerts</p>
                      <p className="text-xs text-muted-foreground">Alerts dispatch units and sounds alarms in milliseconds.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0"><Target className="w-5 h-5 text-blue-500" /></div>
                    <div>
                      <p className="font-semibold text-sm">Targeted Evacuations</p>
                      <p className="text-xs text-muted-foreground">Minimizes crowd panic by routing sectors selectively.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0"><ClipboardCheck className="w-5 h-5 text-purple-500" /></div>
                    <div>
                      <p className="font-semibold text-sm">Local Fire Code Compliance</p>
                      <p className="text-xs text-muted-foreground">Maintains absolute compliance with municipal fire standards.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Specific features grid */}
              <div className="grid grid-cols-1 gap-6">
                {config.features.map((feature, i) => (
                  <div key={feature.title} className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow">
                    <div className="flex gap-2 items-center mb-2">
                      <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold flex items-center justify-center text-xs">{i + 1}</span>
                      <h3 className="font-bold text-base">{feature.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/40 py-16 border-y border-border">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h3 className="text-2xl font-black mb-3">Ready to Secure Your Facility?</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6">
              Connect with our safety system engineers to build a custom compliance blueprint for your organization.
            </p>
            <div className="flex justify-center gap-3">
              <Button size="sm" className="gradient-fire text-white border-0 font-semibold" onClick={() => navigate('/contact')}>
                Consult with Specialists
              </Button>
              <Button size="sm" variant="outline" className="font-semibold" onClick={() => navigate('/pricing')}>
                View Pricing Tiers
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionDetail;
