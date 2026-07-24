import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { AlertOctagon, Siren, PhoneCall, MapPin, Clock, CheckCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const alerts = [
  { id: 'INC-041', type: 'Smoke Detector Triggered', location: 'Warehouse B, Bay 3', severity: 'high', reportedAt: '2 min ago', source: 'IoT Sensor', status: 'responding', assignedTeam: 'Team Alpha', description: 'Photoelectric smoke detector SMK-014 triggered in Bay 3. No visual confirmation yet.' },
  { id: 'INC-040', type: 'Gas Leak Suspected', location: 'Canteen Kitchen', severity: 'critical', reportedAt: '1 day ago', source: 'Manual Report', status: 'resolved', assignedTeam: 'Team Alpha', description: 'Staff reported unusual smell. Gas detector confirmed LPG leak. Valve isolated.' },
  { id: 'INC-039', type: 'Fire Panel Zone Fault', location: 'Main Building, Control Room', severity: 'medium', reportedAt: '2 days ago', source: 'System Alert', status: 'resolved', assignedTeam: 'Team Beta', description: 'Zone 3 panel reporting fault. Technician confirmed loose connection — repaired.' },
  { id: 'INC-038', type: 'Emergency Exit Blocked', location: 'Office Block C, 2F', severity: 'medium', reportedAt: '3 days ago', source: 'Manual Report', status: 'resolved', assignedTeam: 'Team Gamma', description: 'Storage boxes blocking emergency exit door. Cleared and documented.' },
];

const severityConfig: Record<string, string> = {
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
};

const AlertCenter: React.FC = () => {
  const [triggeringSOS, setTriggeringSOS] = useState(false);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.status === filter || a.severity === filter);

  const handleSOS = async () => {
    setTriggeringSOS(true);
    await new Promise(r => setTimeout(r, 2000));
    setTriggeringSOS(false);
    toast.success('SOS Alert broadcast to all emergency teams, safety officer, and facility manager!', { duration: 5000 });
  };

  return (
    <RoleDashboardLayout title="Active Alerts">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Active Alert Center</h2>
            <p className="text-sm text-muted-foreground">Monitor, acknowledge, and manage emergency incidents</p>
          </div>
          <Button
            className={`flex-shrink-0 font-bold text-sm ${triggeringSOS ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white border-0 shadow-lg shadow-red-500/30`}
            onClick={handleSOS}
            disabled={triggeringSOS}
          >
            {triggeringSOS ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Broadcasting...</>
            ) : (
              <><Siren className="w-4 h-4 mr-2 animate-pulse" />TRIGGER SOS</>
            )}
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'responding', label: 'Responding', count: alerts.filter(a => a.status === 'responding').length, color: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
            { key: 'critical', label: 'Critical', count: alerts.filter(a => a.severity === 'critical').length, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' },
            { key: 'resolved', label: 'Resolved Today', count: 2, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
            { key: 'all', label: 'Total (7 days)', count: alerts.length, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
          ].map(s => (
            <button key={s.key} onClick={() => setFilter(filter === s.key ? 'all' : s.key)} className={`p-4 rounded-xl border text-left transition-all ${s.color} ${filter === s.key ? 'ring-2 ring-red-500' : ''}`}>
              <div className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.count}</div>
              <div className="text-xs mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {filtered.map(alert => (
            <div key={alert.id} className={`bg-card border rounded-xl p-4 ${alert.status === 'responding' ? 'border-red-300 dark:border-red-700 shadow-md shadow-red-500/10' : 'border-border'}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${alert.status === 'responding' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-muted'}`}>
                    <AlertOctagon className={`w-4 h-4 ${alert.status === 'responding' ? 'text-red-600 animate-pulse' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">{alert.type}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${severityConfig[alert.severity]}`}>{alert.severity}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${alert.status === 'responding' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>{alert.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{alert.reportedAt}</span>
                      <span>Source: {alert.source}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Assigned: {alert.assignedTeam}</p>
                  </div>
                </div>
              </div>
              {alert.status === 'responding' && (
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="gradient-fire text-white border-0 text-xs" onClick={() => toast.success('Navigating to incident location...')}>
                    Navigate
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success('Calling Team Alpha...')}>
                    <PhoneCall className="w-3 h-3 mr-1" />Contact Team
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default AlertCenter;
