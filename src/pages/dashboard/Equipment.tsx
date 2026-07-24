import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter, QrCode, AlertTriangle, CheckCircle, Clock, WifiOff } from 'lucide-react';
import { toast } from 'sonner';

const equipment = [
  { id: 'EQ001', name: 'Fire Extinguisher ABC-5KG', type: 'extinguisher', location: 'Ground Floor Lobby', floor: 'G', building: 'Main Building', status: 'operational', lastInspected: '2025-06-15', nextInspection: '2025-09-15', serial: 'FE-2024-001' },
  { id: 'EQ002', name: 'Smoke Detector SD-200', type: 'smoke_detector', location: 'B2 Floor Zone A', floor: 'B2', building: 'Main Building', status: 'critical', lastInspected: '2025-07-01', nextInspection: '2025-10-01', serial: 'SD-2023-045' },
  { id: 'EQ003', name: 'Fire Alarm Panel FAP-1', type: 'alarm_panel', location: 'Security Control Room', floor: '1', building: 'Main Building', status: 'operational', lastInspected: '2025-06-20', nextInspection: '2025-09-20', serial: 'FAP-2024-003' },
  { id: 'EQ004', name: 'Hydrant System H-12', type: 'hydrant', location: 'Parking Level 1', floor: 'P1', building: 'Annex', status: 'maintenance', lastInspected: '2025-05-10', nextInspection: '2025-08-10', serial: 'HY-2022-012' },
  { id: 'EQ005', name: 'Sprinkler Head SP-45', type: 'sprinkler', location: 'Server Room', floor: '3', building: 'Data Center', status: 'operational', lastInspected: '2025-07-10', nextInspection: '2025-10-10', serial: 'SP-2023-089' },
  { id: 'EQ006', name: 'Emergency Exit Light EL-7', type: 'exit_light', location: 'Stairwell C', floor: '3', building: 'Main Building', status: 'offline', lastInspected: '2025-04-20', nextInspection: '2025-07-20', serial: 'EL-2021-007' },
  { id: 'EQ007', name: 'Hose Reel HR-22', type: 'hose_reel', location: 'Kitchen Area', floor: '2', building: 'Cafeteria', status: 'operational', lastInspected: '2025-06-01', nextInspection: '2025-09-01', serial: 'HR-2020-022' },
  { id: 'EQ008', name: 'Heat Detector HD-15', type: 'heat_detector', location: 'Boiler Room', floor: 'B1', building: 'Utilities', status: 'operational', lastInspected: '2025-07-05', nextInspection: '2025-10-05', serial: 'HD-2023-015' },
];

const statusConfig = {
  operational: { label: 'Operational', icon: CheckCircle, cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
  maintenance: { label: 'Maintenance', icon: Clock, cls: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' },
  critical: { label: 'Critical', icon: AlertTriangle, cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
  offline: { label: 'Offline', icon: WifiOff, cls: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400' },
};

const Equipment: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = equipment.filter(eq => {
    const matchSearch = eq.name.toLowerCase().includes(search.toLowerCase()) || eq.location.toLowerCase().includes(search.toLowerCase()) || eq.serial.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || eq.status === statusFilter;
    const matchType = typeFilter === 'all' || eq.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const summary = { total: equipment.length, operational: equipment.filter(e => e.status === 'operational').length, maintenance: equipment.filter(e => e.status === 'maintenance').length, critical: equipment.filter(e => e.status === 'critical').length };

  return (
    <DashboardLayout title="Fire Equipment">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Equipment', value: summary.total, color: 'text-foreground' },
            { label: 'Operational', value: summary.operational, color: 'text-green-600 dark:text-green-400' },
            { label: 'Under Maintenance', value: summary.maintenance, color: 'text-orange-600 dark:text-orange-400' },
            { label: 'Critical / Offline', value: summary.critical + equipment.filter(e => e.status === 'offline').length, color: 'text-red-600 dark:text-red-400' },
          ].map(s => (
            <div key={s.label} className="metric-card">
              <div className={`text-3xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="input-field pl-9 h-10 text-sm" placeholder="Search equipment, location, serial..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-full sm:w-40 h-10 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="operational">Operational</option>
            <option value="maintenance">Maintenance</option>
            <option value="critical">Critical</option>
            <option value="offline">Offline</option>
          </select>
          <select className="input-field w-full sm:w-44 h-10 text-sm" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="extinguisher">Extinguisher</option>
            <option value="smoke_detector">Smoke Detector</option>
            <option value="alarm_panel">Alarm Panel</option>
            <option value="hydrant">Hydrant</option>
            <option value="sprinkler">Sprinkler</option>
          </select>
          <Button className="gradient-fire text-white border-0 h-10 whitespace-nowrap" onClick={() => toast.success('Equipment registered!')}>
            <Plus className="w-4 h-4 mr-2" />Add Equipment
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="table-responsive">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  {['Equipment', 'Type', 'Location', 'Status', 'Last Inspected', 'Next Due', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((eq, i) => {
                  const status = statusConfig[eq.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <tr key={eq.id} className={`border-b border-border hover:bg-muted/30 transition-colors ${i % 2 === 0 ? '' : 'bg-muted/10'}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium">{eq.name}</div>
                        <div className="text-xs text-muted-foreground">{eq.serial}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="capitalize text-xs bg-muted px-2 py-1 rounded">{eq.type.replace(/_/g, ' ')}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs">{eq.location}</div>
                        <div className="text-xs text-muted-foreground">Floor {eq.floor} · {eq.building}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${status.cls}`}>
                          <StatusIcon className="w-3 h-3" />{status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{eq.lastInspected}</td>
                      <td className="px-4 py-3 text-xs">{eq.nextInspection}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => toast.success(`QR code for ${eq.name} generated`)} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors" title="Show QR Code">
                            <QrCode className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => toast.info(`Inspection form opened for ${eq.name}`)} className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors text-xs font-medium">
                            Inspect
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No equipment found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Equipment;
