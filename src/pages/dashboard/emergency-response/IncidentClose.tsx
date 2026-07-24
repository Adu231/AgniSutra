import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { CheckCircle, AlertOctagon, Clock, MapPin, Users, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const activeIncidents = [
  { id: 'INC-041', type: 'Smoke Detector Triggered', location: 'Warehouse B, Bay 3', severity: 'high', startedAt: 'Jul 28 · 14:22', respondingTeam: 'Team Alpha', status: 'responding', duration: '24 min', description: 'Smoke detected by SMK-014. Investigation ongoing.' },
  { id: 'INC-037', type: 'Hydrant Valve Stuck', location: 'Parking Complex, L2', severity: 'medium', startedAt: 'Jul 28 · 11:45', respondingTeam: 'Maintenance Team', status: 'contained', duration: '3h 1min', description: 'Hydrant valve jammed during weekly check. Service technician on site.' },
];

const resolvedIncidents = [
  { id: 'INC-040', type: 'Gas Leak Suspected', location: 'Canteen Kitchen', severity: 'critical', resolvedAt: 'Jul 27 · 16:42', teamLead: 'Vikram Nair', resolution: 'LPG valve isolated. Area ventilated. Cleared by fire dept.' },
  { id: 'INC-039', type: 'Panel Zone Fault', location: 'Main Building, CR', severity: 'medium', resolvedAt: 'Jul 26 · 10:15', teamLead: 'Rajesh Singh', resolution: 'Loose wire in zone card repaired. Full system test passed.' },
];

const IncidentClose: React.FC = () => {
  const [activeList, setActiveList] = useState(activeIncidents);
  const [resolved, setResolved] = useState(resolvedIncidents);
  const [closingIncident, setClosingIncident] = useState<typeof activeIncidents[0] | null>(null);
  const [closeForm, setCloseForm] = useState({ resolution: '', equipment: '', personnel: '', followUp: '' });
  const [closing, setClosing] = useState(false);

  const handleClose = async () => {
    if (!closeForm.resolution.trim()) { toast.error('Please describe the resolution actions taken.'); return; }
    setClosing(true);
    await new Promise(r => setTimeout(r, 1500));
    if (closingIncident) {
      setResolved(prev => [{
        id: closingIncident.id,
        type: closingIncident.type,
        location: closingIncident.location,
        severity: closingIncident.severity,
        resolvedAt: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        teamLead: 'Vikram Nair',
        resolution: closeForm.resolution,
      }, ...prev]);
      setActiveList(prev => prev.filter(i => i.id !== closingIncident.id));
    }
    setClosing(false);
    setClosingIncident(null);
    setCloseForm({ resolution: '', equipment: '', personnel: '', followUp: '' });
    toast.success(`Incident ${closingIncident?.id} closed successfully. Post-incident report created.`);
  };

  const severityConfig: Record<string, string> = {
    critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  };

  return (
    <RoleDashboardLayout title="Close Incidents">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Incident Close Management</h2>
          <p className="text-sm text-muted-foreground">Document resolution and formally close active incidents</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-black text-red-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{activeList.length}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Active Incidents</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-black text-green-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{resolved.length}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Resolved (Recent)</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-black text-blue-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>4.2m</div>
            <div className="text-xs text-muted-foreground mt-0.5">Avg Response Time</div>
          </div>
        </div>

        {/* Active Incidents */}
        {activeList.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Active Incidents — Ready to Close</h3>
            {activeList.map(inc => (
              <div key={inc.id} className="bg-card border border-orange-200 dark:border-orange-800/50 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">{inc.type}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityConfig[inc.severity]}`}>{inc.severity}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">{inc.status}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{inc.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Started {inc.startedAt} · {inc.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{inc.respondingTeam}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{inc.description}</p>
                  </div>
                </div>
                <Button size="sm" className="gradient-fire text-white border-0 hover:opacity-90 text-xs" onClick={() => { setClosingIncident(inc); setCloseForm({ resolution: '', equipment: '', personnel: '', followUp: '' }); }}>
                  Close Incident
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Resolved Incidents */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm">Recently Resolved ({resolved.length})</h3>
          </div>
          <div className="divide-y divide-border">
            {resolved.map(inc => (
              <div key={inc.id} className="px-4 py-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{inc.type}</p>
                  <p className="text-xs text-muted-foreground">{inc.location} · Resolved {inc.resolvedAt} · Lead: {inc.teamLead}</p>
                  <p className="text-xs text-muted-foreground mt-1">Resolution: {inc.resolution}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${severityConfig[inc.severity]}`}>{inc.severity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Close Incident Modal */}
        {closingIncident && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Close Incident: {closingIncident.id}</h3>
                <button onClick={() => setClosingIncident(null)} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{closingIncident.type} · {closingIncident.location}</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Resolution Summary *</label>
                  <textarea className="input-field resize-none" rows={3} placeholder="Describe actions taken to resolve this incident..." value={closeForm.resolution} onChange={e => setCloseForm(p => ({ ...p, resolution: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Equipment Used</label>
                  <input className="input-field" placeholder="e.g. CO2 extinguisher, gas detector" value={closeForm.equipment} onChange={e => setCloseForm(p => ({ ...p, equipment: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Personnel Involved</label>
                  <input className="input-field" placeholder="e.g. Team Alpha (4 members)" value={closeForm.personnel} onChange={e => setCloseForm(p => ({ ...p, personnel: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Follow-up Actions Required</label>
                  <input className="input-field" placeholder="Any follow-up needed? (optional)" value={closeForm.followUp} onChange={e => setCloseForm(p => ({ ...p, followUp: e.target.value }))} />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setClosingIncident(null)}>Cancel</Button>
                  <Button className="flex-1 gradient-fire text-white border-0 hover:opacity-90" size="sm" onClick={handleClose} disabled={closing}>
                    {closing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><CheckCircle className="w-4 h-4 mr-2" />Close Incident</>}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
};

export default IncidentClose;
