import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flame, ClipboardCheck, AlertTriangle, Siren, Wifi, MapPin, GraduationCap, BarChart3, Shield, Building2, Smartphone, Settings2, ArrowRight, Check } from 'lucide-react';

const modules = [
  {
    icon: Building2, title: 'Organization & Facility Management', color: 'text-slate-500', bg: 'bg-slate-500/10',
    desc: 'Manage organizations, facilities, buildings, and fire safety assets with multi-organization support, floor plan management, and role-based access control.',
    features: ['Multi-Organization Support', 'Facility & Building Management', 'Floor Plans & Zone Mapping', 'Asset Registration', 'Contractor Management', 'Role-Based Access Control'],
  },
  {
    icon: Flame, title: 'Fire Equipment Management', color: 'text-red-500', bg: 'bg-red-500/10',
    desc: 'Track and manage all fire protection equipment with QR codes, status monitoring, inspection history, and maintenance scheduling.',
    features: ['Fire Extinguisher Management', 'Hydrant & Sprinkler Systems', 'Fire Alarm Panels', 'Smoke & Heat Detectors', 'Equipment QR Codes', 'Emergency Exit Lights'],
  },
  {
    icon: ClipboardCheck, title: 'AI Inspection & Compliance', color: 'text-orange-500', bg: 'bg-orange-500/10',
    desc: 'Automate inspections and regulatory compliance with AI-powered checklists, violation tracking, and corrective action plans.',
    features: ['Digital Inspection Checklists', 'AI Inspection Assistant', 'Compliance Calendar', 'Violation Tracking', 'Corrective Action Plans', 'Auto-Generated Reports'],
  },
  {
    icon: Shield, title: 'Preventive Maintenance', color: 'text-teal-500', bg: 'bg-teal-500/10',
    desc: 'Manage AMC contracts, schedule maintenance, assign technicians, and track service history to ensure timely servicing.',
    features: ['AMC Management', 'Maintenance Scheduling', 'Technician Assignment', 'Service History', 'Spare Parts Inventory', 'Warranty Tracking'],
  },
  {
    icon: AlertTriangle, title: 'AI Risk Assessment', color: 'text-yellow-600', bg: 'bg-yellow-500/10',
    desc: 'Analyze fire hazards and operational risks with AI-driven scoring, heat map visualization, and predictive incident forecasting.',
    features: ['Fire Risk Scoring', 'Hazard Identification', 'Heat Map Visualization', 'Critical Zone Analysis', 'AI Recommendations', 'Incident Prediction'],
  },
  {
    icon: Siren, title: 'Emergency Response Management', color: 'text-red-600', bg: 'bg-red-600/10',
    desc: 'Coordinate emergency actions during incidents with SOS alerts, live incident dashboard, and team coordination tools.',
    features: ['Incident Reporting', 'SOS Alerts', 'Emergency Contacts', 'Evacuation Plans', 'Team Coordination', 'Live Incident Dashboard'],
  },
  {
    icon: GraduationCap, title: 'Employee Training & Certification', color: 'text-purple-500', bg: 'bg-purple-500/10',
    desc: 'Improve preparedness through continuous training with online courses, mock drills, assessments, and certification tracking.',
    features: ['Fire Safety Courses', 'Evacuation Training', 'Mock Drill Scheduling', 'Online Assessments', 'Certificates', 'Training Records'],
  },
  {
    icon: Wifi, title: 'IoT & Smart Monitoring', color: 'text-blue-500', bg: 'bg-blue-500/10',
    desc: 'Real-time monitoring of connected fire safety devices with anomaly detection, instant alerts, and live device dashboards.',
    features: ['IoT Device Integration', 'Smoke Sensor Monitoring', 'Temperature Monitoring', 'Gas Leak Detection', 'Water Tank Levels', 'Real-Time Alerts'],
  },
  {
    icon: MapPin, title: 'GIS & Emergency Mapping', color: 'text-green-500', bg: 'bg-green-500/10',
    desc: 'Location-based emergency intelligence with GIS maps, fire zone mapping, escape routes, and GPS navigation.',
    features: ['GIS Maps', 'Fire Zone Mapping', 'Emergency Assembly Points', 'Hydrant Locations', 'Escape Routes', 'Nearby Fire Station Info'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting', color: 'text-cyan-500', bg: 'bg-cyan-500/10',
    desc: 'Operational intelligence for fire safety with compliance dashboards, inspection analytics, and executive reports.',
    features: ['Compliance Dashboard', 'Inspection Analytics', 'Equipment Health Reports', 'Incident Analytics', 'Risk Trends', 'Executive Dashboards'],
  },
  {
    icon: Smartphone, title: 'Mobile Field Operations', color: 'text-indigo-500', bg: 'bg-indigo-500/10',
    desc: 'Mobile application for inspectors and technicians with offline mode, QR scanning, and geo-tagged inspections.',
    features: ['Offline Mode', 'QR Code Scanning', 'Geo-Tagged Inspections', 'Photo Uploads', 'Voice Notes', 'Digital Signatures'],
  },
  {
    icon: Settings2, title: 'Admin & Governance', color: 'text-gray-500', bg: 'bg-gray-500/10',
    desc: 'Platform administration and enterprise governance with user management, audit logs, and compliance templates.',
    features: ['User Management', 'Organization Management', 'Audit Logs', 'Subscription Plans', 'Security Policies', 'Data Backup & Recovery'],
  },
];

const Features: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium mb-6">
              <Flame className="w-4 h-4" />
              12 Powerful Modules
            </div>
            <h1 className="section-title mb-6">
              Everything Your Organization Needs for
              <span className="gradient-fire-text"> Complete Fire Safety</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              AgniSutra's 12 integrated modules cover every aspect of fire safety management — from equipment tracking to emergency response.
            </p>
            <Button className="gradient-fire text-white border-0 hover:opacity-90 group" size="lg" onClick={() => navigate('/register')}>
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Modules */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((mod, index) => {
                const Icon = mod.icon;
                return (
                  <div key={mod.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className={`w-12 h-12 ${mod.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${mod.color}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{mod.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{mod.desc}</p>
                    <ul className="space-y-1.5">
                      {mod.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Check className={`w-3.5 h-3.5 flex-shrink-0 ${mod.color}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience All 12 Modules?</h2>
            <p className="text-muted-foreground mb-8">Start your free trial today and see how AgniSutra transforms your fire safety operations.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-fire text-white border-0" size="lg" onClick={() => navigate('/register')}>Get Started Free</Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/pricing')}>View Pricing</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
