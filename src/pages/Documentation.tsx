import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, BookOpen, Terminal, Cpu, ShieldAlert, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DocSection {
  id: string;
  category: string;
  title: string;
  content: React.ReactNode;
}

const docSections: DocSection[] = [
  {
    id: 'quick-start',
    category: 'Getting Started',
    title: 'AgniSutra Quick Start Guide',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Welcome to AgniSutra, the industry-leading AI-powered fire safety management ecosystem. This documentation provides a guide to setting up your facilities, installing IoT telemetry nodes, and managing safety inspector workflows.
        </p>
        <div className="p-4 rounded-xl bg-muted/40 border border-border border-l-4 border-l-amber-500">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Important Requirement</p>
          <p className="text-xs text-muted-foreground mt-1">Make sure you have registered your organization with the active billing panel. Default accounts are limited to single-site trial zones.</p>
        </div>
        <h4 className="font-bold text-sm mt-6">Step 1: Define Facility Wards</h4>
        <p className="text-xs text-muted-foreground">Log in to the Facility Manager dashboard and map out site coordinates, buildings, floor layouts, and zone divisions under the Asset Management section.</p>
        <h4 className="font-bold text-sm">Step 2: Assign Team Roles</h4>
        <p className="text-xs text-muted-foreground">Define safety officers, fire inspectors, and maintenance technicians under user permissions to authorize automated dispatch workflows.</p>
      </div>
    ),
  },
  {
    id: 'iot-integration',
    category: 'Integrations',
    title: 'IoT Sensor Node Telemetry Setup',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          AgniSutra integrates with multi-channel smoke, heat, carbon monoxide, and sprinkler telemetry systems. Telemetry signals are routed securely via HTTPS/WSS channels.
        </p>
        <h4 className="font-bold text-sm">API Payload Format</h4>
        <pre className="bg-slate-950 text-slate-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
{`{
  "sensor_id": "SMK-042",
  "zone": "Bay 3 - Warehouse B",
  "readings": {
    "smoke_density_pct": 14.8,
    "temperature_celsius": 42.5,
    "co_ppm": 12
  },
  "timestamp": "2026-07-24T12:00:00Z"
}`}
        </pre>
        <h4 className="font-bold text-sm">Warning Thresholds</h4>
        <p className="text-xs text-muted-foreground">Alarms trigger when temperature exceeds 57°C (135°F) or smoke density rises above 15% opacity over a 3-second interval.</p>
      </div>
    ),
  },
  {
    id: 'compliance-audits',
    category: 'Compliance',
    title: 'Audit Checklist Configurations',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Establish automated audit schedules mapping directly to municipal guidelines (NBC 2016, NFPA 101, BIS standards).
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Monthly pressure checks on all Class A/B/C dry powder extinguishers.</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Weekly battery backup testing on central Fire Alarm Control Panels.</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Bi-annual emergency stairwell illumination diagnostics.</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'emergency-api',
    category: 'Emergency Dispatch',
    title: 'Emergency API & SOS Dispatch protocols',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          The emergency response API triggers broadcast alerts to first responders and on-scene wardens. In critical hazard modes, the platform invokes webhook callbacks to safety sirens.
        </p>
        <h4 className="font-bold text-sm">Active Webhook Callback URL</h4>
        <p className="text-xs text-muted-foreground">Configure webhook targets under Settings {`->`} Webhooks to push raw JSON streams when a critical alert status is triggered.</p>
      </div>
    ),
  },
];

const Documentation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('quick-start');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = docSections.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDoc = docSections.find(doc => doc.id === activeTab) || docSections[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 flex flex-col md:flex-row gap-8 text-left">
        {/* Left Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search docs..."
              className="input-field pl-10 text-xs"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            {filtered.map(doc => (
              <button
                key={doc.id}
                onClick={() => setActiveTab(doc.id)}
                className={`w-full px-3 py-2 text-left rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeTab === doc.id
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-l-2 border-red-500'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {doc.id === 'quick-start' ? (
                  <BookOpen className="w-3.5 h-3.5" />
                ) : doc.id === 'iot-integration' ? (
                  <Cpu className="w-3.5 h-3.5" />
                ) : doc.id === 'compliance-audits' ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <Terminal className="w-3.5 h-3.5" />
                )}
                {doc.title}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-muted-foreground px-3">No topics match search.</p>
            )}
          </div>

          <div className="p-4 rounded-xl border border-border bg-card">
            <h4 className="font-bold text-xs flex items-center gap-1.5"><HelpCircle className="w-4 h-4 text-red-500" />Need help?</h4>
            <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">Our specialist technical support team is standing by to resolve integration queries.</p>
            <Button size="sm" className="w-full mt-3 text-xs gradient-fire text-white border-0" onClick={() => toast.success('Support query channel initiated')}>
              Contact Support
            </Button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="flex-1 bg-card border border-border rounded-2xl p-6 sm:p-8 min-h-[450px] shadow-sm">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span>Documentation</span>
            <span>/</span>
            <span>{activeDoc.category}</span>
          </div>
          <h2 className="text-2xl font-black mb-6 tracking-tight">{activeDoc.title}</h2>
          
          <div className="prose dark:prose-invert max-w-none">
            {activeDoc.content}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
