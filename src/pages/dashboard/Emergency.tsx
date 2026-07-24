import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { AlertOctagon, MapPin, Clock, User, Phone, CheckCircle, Plus, Siren, Radio } from 'lucide-react';
import { toast } from 'sonner';

const incidents = [
  { id: 'INC001', title: 'Smoke Detector Alarm – B2 Floor', type: 'Equipment Fault', severity: 'high', location: 'B2 Floor, Zone A', building: 'Main Building', reportedBy: 'System (IoT)', reportedAt: '2025-07-24 09:30', status: 'responding', description: 'IoT-triggered smoke detector alarm. Technician dispatched. No fire confirmed yet.' },
  { id: 'INC002', title: 'Hydrant Pressure Below Threshold', type: 'Equipment Issue', severity: 'medium', location: 'Parking Level 1', building: 'Annex', reportedBy: 'Ravi Kumar', reportedAt: '2025-07-24 07:15', status: 'open', description: 'Water pressure in hydrant network dropped below 4 bar. Maintenance team notified.' },
  { id: 'INC003', title: 'Emergency Exit Blocked', type: 'Compliance', severity: 'high', location: 'Stairwell C, 3F', building: 'Main Building', reportedBy: 'Priya Sharma', reportedAt: '2025-07-23 14:45', status: 'resolved', description: 'Emergency exit door blocked by pallets. Cleared and re-inspected. Corrective action documented.' },
  { id: 'INC004', title: 'Fire Extinguisher Missing', type: 'Equipment Missing', severity: 'medium', location: 'Cafeteria Kitchen', building: 'Block C', reportedBy: 'Deepika Rao', reportedAt: '2025-07-22 11:30', status: 'resolved', description: 'Fire extinguisher removed for servicing not replaced. Replacement unit installed.' },
  { id: 'INC005', title: 'Gas Leak Detected – Server Room', type: 'IoT Alert', severity: 'critical', location: 'Server Room B', building: 'Data Center', reportedBy: 'System (IoT)', reportedAt: '2025-07-21 23:15', status: 'resolved', description: 'CO2 suppression pre-discharge gas detected. Area evacuated, root cause identified as sensor calibration drift.' },
];

const severityConfig = {
  low: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  medium: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  critical: 'bg-red-600 text-white',
};
const statusConfig = {
  open: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  responding: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  contained: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  resolved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
};

const Emergency: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filtered = incidents.filter(i => filter === 'all' || i.status === filter);

  return (
    <DashboardLayout title="Emergency Response">
      <div className="p-4 sm:p-6 space-y-6">
        {/* SOS Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Siren className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">Emergency Response Console</h2>
                <p className="text-white/70 text-sm">Coordinate emergency actions and track incident resolution in real-time.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-red-600 hover:bg-white/90 font-bold" onClick={() => toast.error('🚨 SOS Alert triggered! Notifying emergency teams...')}>
                <Radio className="w-4 h-4 mr-2" />Trigger SOS Alert
              </Button>
              <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 border" onClick={() => toast.success('Incident reported!')}>
                <Plus className="w-4 h-4 mr-2" />Report Incident
              </Button>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Active Incidents', value: incidents.filter(i => i.status !== 'resolved').length, color: 'text-red-600 dark:text-red-400' },
            { label: 'Critical', value: incidents.filter(i => i.severity === 'critical').length, color: 'text-red-600 dark:text-red-400' },
            { label: 'Responding', value: incidents.filter(i => i.status === 'responding').length, color: 'text-orange-500' },
            { label: 'Resolved (7d)', value: incidents.filter(i => i.status === 'resolved').length, color: 'text-green-500' },
          ].map(m => (
            <div key={m.label} className="metric-card">
              <div className={`text-3xl font-black ${m.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{m.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {['all', 'open', 'responding', 'resolved'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${filter === s ? 'gradient-fire text-white' : 'bg-card border border-border hover:bg-muted'}`}>
              {s === 'all' ? 'All Incidents' : s}
            </button>
          ))}
        </div>

        {/* Incidents List */}
        <div className="space-y-4">
          {filtered.map(incident => (
            <div key={incident.id} className={`bg-card border rounded-xl p-5 hover:shadow-md transition-all ${incident.status === 'responding' ? 'border-red-300 dark:border-red-800' : 'border-border'}`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize ${severityConfig[incident.severity as keyof typeof severityConfig]}`}>
                      {incident.severity}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusConfig[incident.status as keyof typeof statusConfig]}`}>
                      {incident.status}
                    </span>
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">{incident.type}</span>
                  </div>
                  <h3 className="font-bold mb-1">{incident.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{incident.location} · {incident.building}</div>
                    <div className="flex items-center gap-1"><User className="w-3 h-3" />Reported by: {incident.reportedBy}</div>
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{incident.reportedAt}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {incident.status !== 'resolved' && (
                    <Button size="sm" className="gradient-fire text-white border-0 text-xs" onClick={() => toast.success(`Incident ${incident.id} marked as resolved!`)}>
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />Mark Resolved
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing details for ${incident.id}`)}>View Details</Button>
                  {incident.status === 'open' && (
                    <Button size="sm" variant="outline" className="text-orange-600 border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-xs" onClick={() => toast.success('Response team notified!')}>
                      <Phone className="w-3.5 h-3.5 mr-1" />Alert Team
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contacts */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Emergency Contacts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { role: 'Fire Department', name: 'Mumbai Fire Brigade', phone: '101', color: 'bg-red-500' },
              { role: 'Safety Officer (On-call)', name: 'Vikram Nair', phone: '+91 98765 43210', color: 'bg-orange-500' },
              { role: 'Facility Manager', name: 'Priya Sharma', phone: '+91 98765 43211', color: 'bg-blue-500' },
            ].map(contact => (
              <div key={contact.role} className="flex items-center gap-3 p-4 bg-muted/40 rounded-xl">
                <div className={`w-10 h-10 ${contact.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{contact.role}</p>
                  <p className="font-semibold text-sm">{contact.name}</p>
                  <a href={`tel:${contact.phone}`} className="text-xs text-red-600 dark:text-red-400 hover:underline">{contact.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Emergency;
