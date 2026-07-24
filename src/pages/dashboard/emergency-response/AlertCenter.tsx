import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { AlertOctagon, Siren, PhoneCall, MapPin, Clock, CheckCircle, Bell, X, Send } from 'lucide-react';
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
  const [alertsList, setAlertsList] = useState(alerts);

  const [navigatingAlert, setNavigatingAlert] = useState<typeof alerts[0] | null>(null);
  const [contactingAlert, setContactingAlert] = useState<typeof alerts[0] | null>(null);
  const [radioMessage, setRadioMessage] = useState('');
  const [radioLog, setRadioLog] = useState<string[]>([
    '[Command Center]: Team Alpha, do you copy?',
    '[Team Alpha]: Loud and clear, approaching Bay 3 now.'
  ]);

  const filtered = filter === 'all' ? alertsList : alertsList.filter(a => a.status === filter || a.severity === filter);

  const handleSOS = async () => {
    setTriggeringSOS(true);
    await new Promise(r => setTimeout(r, 2000));
    setTriggeringSOS(false);
    
    // Add new emergency alert
    const newSOSAlert = {
      id: `SOS-${Date.now().toString().slice(-4)}`,
      type: 'CRITICAL SOS ALERT TRIGGERED',
      location: 'Command Center Broadcast',
      severity: 'critical',
      reportedAt: 'Just now',
      source: 'SOS Button',
      status: 'responding',
      assignedTeam: 'All Teams',
      description: 'Emergency Responder triggered global SOS panic broadcast. Initiating full facility evacuation.'
    };
    setAlertsList(prev => [newSOSAlert, ...prev]);
    toast.success('SOS Alert broadcast to all emergency teams, safety officer, and facility manager!', { duration: 5000 });
  };

  const sendRadioMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!radioMessage) return;
    setRadioLog(prev => [...prev, `[Command Center]: ${radioMessage}`]);
    setRadioMessage('');
    toast.success('Radio dispatch sent');
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
            { key: 'responding', label: 'Responding', count: alertsList.filter(a => a.status === 'responding').length, color: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
            { key: 'critical', label: 'Critical', count: alertsList.filter(a => a.severity === 'critical').length, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' },
            { key: 'resolved', label: 'Resolved Today', count: 2, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
            { key: 'all', label: 'Total (7 days)', count: alertsList.length, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
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
                  <Button size="sm" className="gradient-fire text-white border-0 text-xs font-semibold hover:opacity-90" onClick={() => setNavigatingAlert(alert)}>
                    Navigate
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs font-semibold hover:opacity-90" onClick={() => setContactingAlert(alert)}>
                    <PhoneCall className="w-3 h-3 mr-1" />Contact Team
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Map Modal */}
      {navigatingAlert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  Live Incident Route Navigation
                </h3>
                <p className="text-xs text-muted-foreground">Target Location: {navigatingAlert.location}</p>
              </div>
              <button
                onClick={() => setNavigatingAlert(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Simulated Floor Map */}
              <div className="relative aspect-[4/3] rounded-xl border border-border bg-slate-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
                
                {/* Simulated Floor layout outlines */}
                <div className="absolute w-[80%] h-[70%] border-2 border-slate-700/60 rounded flex items-center justify-around">
                  <div className="w-16 h-16 border border-slate-800 bg-slate-900/50 rounded flex items-center justify-center text-[10px] text-slate-500">Zone A</div>
                  <div className="w-16 h-16 border border-slate-800 bg-slate-900/50 rounded flex items-center justify-center text-[10px] text-slate-500">Zone B</div>
                  <div className="w-16 h-16 border border-slate-800 bg-slate-900/50 rounded flex items-center justify-center text-[10px] text-slate-500">Zone C</div>
                </div>

                {/* Pulsing route line */}
                <svg className="absolute w-full h-full pointer-events-none">
                  <path
                    d="M 50,180 L 150,180 L 150,110 L 280,110"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                    className="animate-[dash_2s_linear_infinite]"
                  />
                  <style>{`
                    @keyframes dash {
                      to {
                        stroke-dashoffset: -20;
                      }
                    }
                  `}</style>
                </svg>

                {/* Command Center marker */}
                <div className="absolute left-[35px] top-[165px] flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-white text-[9px] font-bold">CC</div>
                  <span className="text-[8px] text-blue-400 bg-slate-950/80 px-1 mt-0.5 rounded">You</span>
                </div>

                {/* Target Fire marker */}
                <div className="absolute left-[265px] top-[95px] flex flex-col items-center animate-bounce">
                  <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/50">
                    <AlertOctagon className="w-4 h-4 animate-pulse" />
                  </div>
                  <span className="text-[8px] text-red-400 bg-slate-950/80 px-1 mt-0.5 rounded font-semibold">{navigatingAlert.id}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs border border-border p-3 rounded-lg bg-muted/20">
                <div>
                  <p className="font-semibold">Route Summary</p>
                  <p className="text-muted-foreground">Estimated distance: 120m · Standard response time: ~90s</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-rose-500">Evacuation Zone Clear</p>
                  <p className="text-[10px] text-muted-foreground">Sprinklers Activated</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-3 border-t border-border flex justify-end bg-muted/20">
              <Button size="sm" onClick={() => setNavigatingAlert(null)}>Close Route Map</Button>
            </div>
          </div>
        </div>
      )}

      {/* Radio Intercom Modal */}
      {contactingAlert && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-green-500" />
                  Live Radio Dispatch Intercom
                </h3>
                <p className="text-xs text-muted-foreground">Assigned Unit: {contactingAlert.assignedTeam}</p>
              </div>
              <button
                onClick={() => setContactingAlert(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 text-xs bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-2.5 rounded-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold">Radio Channel Connected (CH-01)</p>
                  <p className="text-[10px] opacity-80">Signal strength: Excellent (128kbps secure duplex)</p>
                </div>
              </div>

              {/* Chat radio logs */}
              <div className="h-44 border border-border rounded-xl p-3 bg-muted/30 overflow-y-auto space-y-2 font-mono text-xs">
                {radioLog.map((log, idx) => (
                  <div key={idx} className={log.includes('Command') ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}>
                    {log}
                  </div>
                ))}
              </div>

              {/* Message composer */}
              <form onSubmit={sendRadioMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type radio dispatch instruction..."
                  className="input-field flex-1 text-xs"
                  value={radioMessage}
                  onChange={e => setRadioMessage(e.target.value)}
                />
                <Button size="sm" type="submit" className="gradient-fire text-white border-0">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>
            <div className="px-6 py-3 border-t border-border flex justify-end bg-muted/20">
              <Button size="sm" variant="outline" onClick={() => setContactingAlert(null)}>Disconnect Channel</Button>
            </div>
          </div>
        </div>
      )}
    </RoleDashboardLayout>
  );
};

export default AlertCenter;
