import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Radio, Truck, Users, MapPin, Clock, CheckCircle, Send, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const activeResponse = {
  id: 'CALL-201',
  type: 'Structure Fire',
  address: 'Warehouse B, Andheri Industrial Zone',
  startedAt: '14:22',
  elapsed: '24 min',
};

// Deployed units definition is now managed via component state

const communicationsLog = [
  { time: '14:44', from: 'FT-01 Commander', message: 'On scene. Structure fire confirmed in Bay 3. Smoke and heat visible. Beginning suppression.', type: 'status' },
  { time: '14:42', from: 'Dispatch', message: 'Fire Tender Alpha ETA 2 minutes. Confirm approach route via North Gate.', type: 'command' },
  { time: '14:38', from: 'Safety Officer', message: 'Building evacuated. Chemical storage Zone B isolated. 58 workers accounted for at Assembly A.', type: 'info' },
  { time: '14:34', from: 'Dispatch', message: 'CALL-201 received — Structure Fire, Warehouse B. Fire Tender Alpha dispatched.', type: 'dispatch' },
  { time: '14:22', from: 'AgniSutra System', message: 'Automated alert: Smoke detector SMK-014 triggered — Bay 3, Warehouse B, Andheri.', type: 'alert' },
];

const msgTypeConfig: Record<string, string> = {
  status: 'border-l-green-500 bg-green-50 dark:bg-green-900/10',
  command: 'border-l-amber-500 bg-amber-50 dark:bg-amber-900/10',
  info: 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/10',
  dispatch: 'border-l-purple-500 bg-purple-50 dark:bg-purple-900/10',
  alert: 'border-l-red-500 bg-red-50 dark:bg-red-900/10',
};

const ResponseCoordination: React.FC = () => {
  const [message, setMessage] = useState('');
  const [log, setLog] = useState(communicationsLog);
  const [sending, setSending] = useState(false);

  const [units, setUnits] = useState([
    { id: 'FT-01', name: 'Fire Tender Alpha', status: 'on_scene', location: 'Warehouse B Entry', crew: 5, role: 'Primary Attack' },
  ]);

  const [timelineSteps, setTimelineSteps] = useState([
    { label: 'Alert Received', time: '14:22', done: true },
    { label: 'Unit Dispatched', time: '14:34', done: true },
    { label: 'Unit On Scene', time: '14:44', done: true },
    { label: 'Fire Contained', time: 'Pending', done: false },
    { label: 'All Clear', time: 'Pending', done: false },
    { label: 'Incident Closed', time: 'Pending', done: false },
  ]);

  const handleMarkContained = () => {
    setTimelineSteps(prev => prev.map(step => step.label === 'Fire Contained' ? { ...step, done: true, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) } : step));
    toast.success('Incident marked as Contained successfully!');
  };

  const handleRequestUnit = () => {
    const newUnit = {
      id: `FT-0${units.length + 1}`,
      name: `Fire Tender ${String.fromCharCode(65 + units.length)}`, // Beta, Gamma, etc.
      status: 'dispatching',
      location: 'En Route from Base',
      crew: 4,
      role: 'Support Attack'
    };
    setUnits(prev => [...prev, newUnit]);
    toast.success(`${newUnit.name} requested and dispatched to scene!`);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 500));
    setLog(prev => [{ time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), from: 'Dispatch (You)', message, type: 'command' }, ...prev]);
    setMessage('');
    setSending(false);
    toast.success('Message broadcast to all units');
  };

  return (
    <RoleDashboardLayout title="Response Coordination">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Response Coordination</h2>
          <p className="text-sm text-muted-foreground">Live coordination panel for active incident response</p>
        </div>

        {/* Active Incident Banner */}
        <div className="bg-amber-600 rounded-2xl p-5 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-bold">ACTIVE: {activeResponse.id}</span>
              </div>
              <p className="text-white/80">{activeResponse.type} · {activeResponse.address}</p>
              <p className="text-white/70 text-sm mt-1">Started: {activeResponse.startedAt} · Elapsed: {activeResponse.elapsed}</p>
            </div>
            <Button size="sm" className="bg-white text-amber-700 hover:bg-white/90 font-semibold text-xs flex items-center" onClick={handleMarkContained}>
              <CheckCircle className="w-3 h-3 mr-1" />Mark Contained
            </Button>
          </div>
        </div>

        {/* Incident Status + Units */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deployed Units */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Truck className="w-4 h-4 text-amber-500" />Deployed Units</h3>
            <div className="space-y-3">
              {units.map(unit => (
                <div key={unit.id} className="p-3 bg-muted/40 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold">{unit.name}</p>
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded font-medium">{unit.status.replace('_', ' ')}</span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{unit.location}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="w-3 h-3" />{unit.crew} crew · {unit.role}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success(`Connected to ${unit.name}...`)}>
                      <Radio className="w-3 h-3 mr-1" />Radio
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success('Status updated')}>Update Status</Button>
                  </div>
                </div>
              ))}
              <Button size="sm" className="w-full text-xs gradient-fire text-white border-0 font-semibold hover:opacity-90 flex items-center justify-center" onClick={handleRequestUnit}>
                <Truck className="w-3 h-3 mr-1" />Request Additional Unit
              </Button>
            </div>
          </div>

          {/* Incident Timeline */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Incident Status</h3>
            <div className="space-y-3">
              {timelineSteps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-green-500' : 'bg-muted'}`}>
                    {s.done ? <CheckCircle className="w-3.5 h-3.5 text-white" /> : <span className="text-xs text-muted-foreground">{i + 1}</span>}
                  </div>
                  <div className="flex-1 flex justify-between">
                    <span className={`text-sm ${s.done ? 'font-medium' : 'text-muted-foreground'}`}>{s.label}</span>
                    <span className={`text-xs ${s.done ? 'text-green-600 font-semibold' : 'text-muted-foreground'}`}>{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Communications Log */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-sm">Communications Log</h3>
          </div>
          <div className="p-4 space-y-2 max-h-60 overflow-y-auto">
            {log.map((msg, i) => (
              <div key={i} className={`border-l-4 pl-3 py-2 rounded-r-lg text-sm ${msgTypeConfig[msg.type]}`}>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold">{msg.from}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-xs">{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="px-4 pb-4 border-t border-border pt-3 flex gap-2">
            <input
              className="input-field flex-1 text-sm"
              placeholder="Broadcast message to all units..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <Button size="sm" className="gradient-fire text-white border-0 hover:opacity-90" onClick={handleSend} disabled={sending}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default ResponseCoordination;
