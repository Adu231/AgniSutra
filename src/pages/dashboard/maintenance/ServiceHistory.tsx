import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { History, Search, Clock, Wrench, CheckCircle, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const serviceHistory = [
  { id: 'SVC-082', equipment: 'CO2 Extinguisher EXT-001', type: 'Refill & Inspection', location: 'Main Building, G Floor', technician: 'Rajesh Singh', completedAt: 'Jul 22, 2025', duration: '45 min', parts: ['CO2 Cartridge x1'], status: 'verified', notes: 'Pressure restored to normal. Safety pin replaced.', cost: 850 },
  { id: 'SVC-081', equipment: 'Alarm Panel AP-01', type: 'Repair', location: 'Main Building, Control Room', technician: 'Mohan Kumar', completedAt: 'Jul 18, 2025', duration: '2h 30min', parts: ['Zone Card #3', 'Wiring Harness'], status: 'verified', notes: 'Zone 3 connectivity restored. Full system test passed.', cost: 3200 },
  { id: 'SVC-080', equipment: 'Sprinkler Head SP-08', type: 'Replacement', location: 'Data Center, Server Room', technician: 'Rajesh Singh', completedAt: 'Jul 15, 2025', duration: '1h', parts: ['Sprinkler Head K-Factor 5.6 x1'], status: 'verified', notes: 'Corroded head replaced. Flow test completed successfully.', cost: 1450 },
  { id: 'SVC-079', equipment: 'Exit Light EL-1A', type: 'Battery Replacement', location: 'Main Building, 1F', technician: 'Rajesh Singh', completedAt: 'Jul 10, 2025', duration: '30 min', parts: ['NiMH Battery Pack x1'], status: 'verified', notes: 'Backup battery replaced. 4-hour discharge test completed.', cost: 620 },
  { id: 'SVC-078', equipment: 'Hose Reel HR-01', type: 'Annual Service', location: 'Main Building, 2F', technician: 'Mohan Kumar', completedAt: 'Jul 05, 2025', duration: '1h 15min', parts: ['Nozzle Washer Set', 'Valve O-Ring'], status: 'verified', notes: 'Full hose inspection. Minor leakage at nozzle joint — repaired.', cost: 780 },
  { id: 'SVC-077', equipment: 'Smoke Detector SMK-011', type: 'Calibration', location: 'Warehouse B, Bay 1', technician: 'Rajesh Singh', completedAt: 'Jun 28, 2025', duration: '20 min', parts: [], status: 'verified', notes: 'Sensitivity recalibrated. Alarm trigger test passed.', cost: 0 },
];

const ServiceHistory: React.FC = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = serviceHistory.filter(s =>
    s.equipment.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    toast.success('Generating export file...');
    
    // Construct CSV content
    const headers = ['Service ID', 'Equipment', 'Type', 'Location', 'Technician', 'Completed At', 'Duration', 'Parts Used', 'Notes', 'Cost (INR)'];
    const rows = filtered.map(svc => [
      svc.id,
      svc.equipment,
      svc.type,
      svc.location,
      svc.technician,
      svc.completedAt,
      svc.duration,
      svc.parts.join('; '),
      svc.notes,
      svc.cost.toString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Service_History_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const totalCost = serviceHistory.reduce((sum, s) => sum + s.cost, 0);
  const avgDuration = '1h 10min';

  return (
    <RoleDashboardLayout title="Service History">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Service History</h2>
          <p className="text-sm text-muted-foreground">Complete record of all completed maintenance services</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Services', value: serviceHistory.length, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'This Month', value: 6, color: 'text-green-600 dark:text-green-400' },
            { label: 'Total Cost (Jul)', value: `₹${(totalCost/1000).toFixed(1)}K`, color: 'text-orange-600 dark:text-orange-400' },
            { label: 'Avg Duration', value: avgDuration, color: 'text-purple-600 dark:text-purple-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="input-field pl-10" placeholder="Search service records..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Service Records */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm">Service Records ({filtered.length})</h3>
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-semibold hover:opacity-90"
              onClick={handleExport}
            >
              <Download className="w-3.5 h-3.5 mr-1" />Export
            </Button>
          </div>
          <div className="divide-y divide-border">
            {filtered.map(svc => (
              <div key={svc.id}>
                <div
                  className="px-4 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === svc.id ? null : svc.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold">{svc.equipment}</p>
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded">{svc.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{svc.location}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{svc.completedAt}</span>
                        <span>·</span>
                        <span>{svc.duration}</span>
                        {svc.cost > 0 && <><span>·</span><span>₹{svc.cost.toLocaleString()}</span></>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === svc.id ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
                {expanded === svc.id && (
                  <div className="px-4 pb-4 bg-muted/20 border-t border-border">
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Technician</p>
                        <p className="font-medium">{svc.technician}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Service ID</p>
                        <p className="font-mono text-sm">{svc.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Parts Used</p>
                        <p>{svc.parts.length > 0 ? svc.parts.join(', ') : 'No parts used'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Notes</p>
                        <p>{svc.notes}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default ServiceHistory;
