import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { AlertOctagon, MapPin, Clock, Users, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const incidents = [
  { id: 'CALL-201', type: 'Structure Fire', address: 'Warehouse B, Plot 14, Andheri Industrial Zone', coordinates: '19.1076° N, 72.8762° E', priority: 'critical', reportedAt: '2 min ago', source: 'Automated — AgniSutra IoT', status: 'pending', buildingType: 'Industrial Warehouse', floors: 3, occupancy: 'Light Industrial', hazmat: 'Chemical Storage — Zone B', contacts: [{ name: 'Facility Manager', phone: '+91 98001 10001' }] },
  { id: 'CALL-200', type: 'Gas Leak', address: '14 Linking Road, Bandra West', coordinates: '19.0544° N, 72.8322° E', priority: 'high', reportedAt: '12 min ago', source: 'Public Call — 101', status: 'dispatched', buildingType: 'Residential Complex', floors: 8, occupancy: '120 residents', hazmat: 'LPG Lines', contacts: [{ name: 'Building Society', phone: '+91 98001 20001' }] },
  { id: 'CALL-199', type: 'Electrical Fire', address: 'IT Park, Tower C, Powai', coordinates: '19.1176° N, 72.9048° E', priority: 'high', reportedAt: '35 min ago', source: 'Building Security', status: 'contained', buildingType: 'Commercial Office', floors: 12, occupancy: '800 employees', hazmat: 'Server Room — CO2 Suppression', contacts: [{ name: 'Building Security', phone: '+91 98001 30001' }] },
  { id: 'CALL-198', type: 'Vehicle Fire', address: 'Eastern Express Highway, Near Exit 7', coordinates: '19.0448° N, 72.8890° E', priority: 'medium', reportedAt: '1 hour ago', source: 'Traffic Police', status: 'resolved', buildingType: 'Highway', floors: null, occupancy: 'N/A', hazmat: 'Vehicle fuel', contacts: [] },
];

const priorityConfig: Record<string, string> = {
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
};

const statusConfig: Record<string, string> = {
  pending: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  dispatched: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  contained: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  resolved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
};

const IncomingIncidents: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<typeof incidents[0] | null>(incidents[0]);

  const filtered = filter === 'all' ? incidents : incidents.filter(i => i.status === filter || i.priority === filter);

  return (
    <RoleDashboardLayout title="Incoming Incidents">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Incoming Incident Queue</h2>
          <p className="text-sm text-muted-foreground">Priority-sorted dispatch queue for all active and pending incidents</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'pending', label: 'Pending Dispatch', count: incidents.filter(i => i.status === 'pending').length, color: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
            { key: 'dispatched', label: 'Units Dispatched', count: incidents.filter(i => i.status === 'dispatched').length, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
            { key: 'contained', label: 'Contained', count: incidents.filter(i => i.status === 'contained').length, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' },
            { key: 'resolved', label: 'Resolved Today', count: incidents.filter(i => i.status === 'resolved').length, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
          ].map(s => (
            <button key={s.key} onClick={() => setFilter(filter === s.key ? 'all' : s.key)} className={`p-4 rounded-xl border text-left transition-all ${s.color} ${filter === s.key ? 'ring-2 ring-amber-500' : ''}`}>
              <div className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.count}</div>
              <div className="text-xs mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incident List */}
          <div className="lg:col-span-2 space-y-3">
            {filtered.map(inc => (
              <div
                key={inc.id}
                className={`bg-card border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${selected?.id === inc.id ? 'ring-2 ring-amber-500 border-amber-300 dark:border-amber-700' : 'border-border'} ${inc.priority === 'critical' && inc.status === 'pending' ? 'border-l-4 border-l-red-500' : ''}`}
                onClick={() => setSelected(inc)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-sm font-semibold">{inc.type}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium border ${priorityConfig[inc.priority]}`}>{inc.priority}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusConfig[inc.status]}`}>{inc.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{inc.address}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{inc.reportedAt} · {inc.source}</p>
                  </div>
                  {inc.status === 'pending' && (
                    <Button size="sm" className="gradient-fire text-white border-0 text-xs flex-shrink-0" onClick={e => { e.stopPropagation(); toast.success(`Unit dispatched to ${inc.id}!`); }}>
                      <Truck className="w-3 h-3 mr-1" />Dispatch
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Incident Detail */}
          {selected && (
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-4 text-sm">Incident Detail: {selected.id}</h3>
              <div className="space-y-3 text-sm">
                <div><p className="text-xs text-muted-foreground">Type</p><p className="font-medium">{selected.type}</p></div>
                <div><p className="text-xs text-muted-foreground">Address</p><p className="font-medium">{selected.address}</p></div>
                <div><p className="text-xs text-muted-foreground">GPS</p><p className="font-mono text-xs">{selected.coordinates}</p></div>
                <div><p className="text-xs text-muted-foreground">Building Type</p><p className="font-medium">{selected.buildingType}</p></div>
                {selected.floors && <div><p className="text-xs text-muted-foreground">Floors</p><p className="font-medium">{selected.floors}</p></div>}
                <div><p className="text-xs text-muted-foreground">Occupancy</p><p className="font-medium">{selected.occupancy}</p></div>
                <div><p className="text-xs text-muted-foreground">Hazmat</p><p className="font-medium text-orange-600">{selected.hazmat}</p></div>
                {selected.contacts.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Contacts</p>
                    {selected.contacts.map(c => (
                      <p key={c.name} className="text-xs">{c.name}: <span className="font-mono text-amber-600">{c.phone}</span></p>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                {selected.status === 'pending' && <Button size="sm" className="flex-1 gradient-fire text-white border-0 text-xs" onClick={() => toast.success('Unit dispatched!')}>Dispatch Unit</Button>}
                <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => toast.success('Building info accessed')}>Building Info</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default IncomingIncidents;
