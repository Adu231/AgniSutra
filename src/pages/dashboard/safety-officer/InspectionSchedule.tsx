import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Calendar, Plus, User, Clock, MapPin, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const scheduledInspections = [
  { id: 'SCH-001', facility: 'Main Building', type: 'Monthly Fire Inspection', inspector: 'Suresh Kumar', date: 'Jul 28, 2025', time: '09:00 AM', status: 'upcoming', priority: 'high', zones: ['Zone A', 'Zone B', 'Zone C'] },
  { id: 'SCH-002', facility: 'Warehouse B', type: 'Equipment Audit', inspector: 'Arjun Mehta', date: 'Jul 30, 2025', time: '10:30 AM', status: 'upcoming', priority: 'medium', zones: ['Bay 1', 'Bay 2', 'Bay 3'] },
  { id: 'SCH-003', facility: 'Data Center', type: 'Suppression System Check', inspector: 'Vikram Nair', date: 'Aug 02, 2025', time: '08:00 AM', status: 'upcoming', priority: 'critical', zones: ['Server Room A', 'Server Room B'] },
  { id: 'SCH-004', facility: 'Office Block C', type: 'Exit & Emergency Lighting', inspector: 'Suresh Kumar', date: 'Aug 05, 2025', time: '11:00 AM', status: 'upcoming', priority: 'high', zones: ['All Floors'] },
  { id: 'SCH-005', facility: 'Parking Complex', type: 'Hydrant System Check', inspector: 'Vikram Nair', date: 'Aug 08, 2025', time: '09:30 AM', status: 'upcoming', priority: 'medium', zones: ['Level 1', 'Level 2'] },
  { id: 'SCH-006', facility: 'Main Building', type: 'Quarterly Compliance Audit', inspector: 'Arjun Mehta', date: 'Aug 15, 2025', time: '09:00 AM', status: 'upcoming', priority: 'critical', zones: ['All Zones'] },
];

const completedInspections = [
  { id: 'SCH-000', facility: 'Main Building', type: 'Monthly Fire Inspection', inspector: 'Suresh Kumar', date: 'Jun 25, 2025', status: 'completed', score: 96 },
  { id: 'SCH-099', facility: 'Warehouse B', type: 'Sprinkler Check', inspector: 'Vikram Nair', date: 'Jun 20, 2025', status: 'completed', score: 88 },
];

const priorityConfig: Record<string, string> = {
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
};

const InspectionSchedule: React.FC = () => {
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ facility: '', type: '', inspector: '', date: '', time: '09:00', priority: 'medium' });
  const [saving, setSaving] = useState(false);
  const [inspections, setInspections] = useState(scheduledInspections);

  const handleSchedule = async () => {
    if (!newForm.facility || !newForm.type || !newForm.inspector || !newForm.date) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    const newInsp = {
      id: `SCH-${Date.now()}`,
      facility: newForm.facility,
      type: newForm.type,
      inspector: newForm.inspector,
      date: new Date(newForm.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: newForm.time,
      status: 'upcoming',
      priority: newForm.priority,
      zones: ['All Zones'],
    };
    setInspections(prev => [newInsp, ...prev]);
    setSaving(false);
    setShowNew(false);
    setNewForm({ facility: '', type: '', inspector: '', date: '', time: '09:00', priority: 'medium' });
    toast.success('Inspection scheduled successfully!');
  };

  return (
    <RoleDashboardLayout title="Inspection Schedule">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Inspection Schedule</h2>
            <p className="text-sm text-muted-foreground">Plan and manage upcoming fire safety inspections</p>
          </div>
          <Button className="gradient-fire text-white border-0 hover:opacity-90" size="sm" onClick={() => setShowNew(!showNew)}>
            <Plus className="w-4 h-4 mr-2" />Schedule Inspection
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'This Week', value: 2, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'This Month', value: inspections.length, color: 'text-orange-600 dark:text-orange-400' },
            { label: 'Critical Due', value: inspections.filter(i => i.priority === 'critical').length, color: 'text-red-600 dark:text-red-400' },
            { label: 'Completed', value: completedInspections.length, color: 'text-green-600 dark:text-green-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* New Inspection Form */}
        {showNew && (
          <div className="bg-card border border-red-200 dark:border-red-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Schedule New Inspection</h3>
              <button onClick={() => setShowNew(false)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Facility *</label>
                <select className="input-field" value={newForm.facility} onChange={e => setNewForm(p => ({ ...p, facility: e.target.value }))}>
                  <option value="">Select facility...</option>
                  <option>Main Building</option>
                  <option>Warehouse B</option>
                  <option>Data Center</option>
                  <option>Office Block C</option>
                  <option>Parking Complex</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Inspection Type *</label>
                <select className="input-field" value={newForm.type} onChange={e => setNewForm(p => ({ ...p, type: e.target.value }))}>
                  <option value="">Select type...</option>
                  <option>Monthly Fire Inspection</option>
                  <option>Equipment Audit</option>
                  <option>Exit & Emergency Lighting</option>
                  <option>Sprinkler System Check</option>
                  <option>Hydrant System Check</option>
                  <option>Quarterly Compliance Audit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Inspector *</label>
                <select className="input-field" value={newForm.inspector} onChange={e => setNewForm(p => ({ ...p, inspector: e.target.value }))}>
                  <option value="">Select inspector...</option>
                  <option>Suresh Kumar</option>
                  <option>Vikram Nair</option>
                  <option>Arjun Mehta</option>
                  <option>Priya Sharma</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Priority</label>
                <select className="input-field" value={newForm.priority} onChange={e => setNewForm(p => ({ ...p, priority: e.target.value }))}>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Date *</label>
                <input type="date" className="input-field" value={newForm.date} onChange={e => setNewForm(p => ({ ...p, date: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Time</label>
                <input type="time" className="input-field" value={newForm.time} onChange={e => setNewForm(p => ({ ...p, time: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" size="sm" onClick={() => setShowNew(false)}>Cancel</Button>
              <Button className="gradient-fire text-white border-0 hover:opacity-90" size="sm" onClick={handleSchedule} disabled={saving}>
                {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Schedule Inspection'}
              </Button>
            </div>
          </div>
        )}

        {/* Upcoming Inspections */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm">Upcoming Inspections</h3>
          </div>
          <div className="divide-y divide-border">
            {inspections.map(insp => (
              <div key={insp.id} className="px-4 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-fire rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                    <span className="text-xs font-bold">{insp.date.split(', ')[0].split(' ')[1]}</span>
                    <span className="text-xs opacity-80">{insp.date.split(' ')[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="text-sm font-semibold">{insp.type}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig[insp.priority]}`}>{insp.priority}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{insp.facility}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{insp.time}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{insp.inspector}</span>
                    </div>
                    <div className="flex gap-1 mt-1.5">
                      {insp.zones.map(z => (
                        <span key={z} className="text-xs bg-muted px-1.5 py-0.5 rounded">{z}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success('Reminder sent to inspector!')}>Remind</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm text-muted-foreground">Recently Completed</h3>
          </div>
          <div className="divide-y divide-border">
            {completedInspections.map(insp => (
              <div key={insp.id} className="px-4 py-4 flex items-center gap-4 opacity-75">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{insp.facility} · {insp.type}</p>
                  <p className="text-xs text-muted-foreground">{insp.inspector} · {insp.date}</p>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">{insp.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default InspectionSchedule;
