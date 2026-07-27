import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Search, Filter, QrCode, CheckCircle, AlertTriangle, Clock, MapPin, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const equipment = [
  { id: 'EQ-001', name: 'CO2 Extinguisher', type: 'Extinguisher', location: 'Main Building', floor: 'G Floor, Zone A', status: 'operational', lastInspected: 'Jul 15, 2025', nextDue: 'Aug 15, 2025', serial: 'EXT-2024-001' },
  { id: 'EQ-002', name: 'Wet Chemical Extinguisher', type: 'Extinguisher', location: 'Canteen', floor: 'G Floor', status: 'operational', lastInspected: 'Jul 10, 2025', nextDue: 'Aug 10, 2025', serial: 'EXT-2024-002' },
  { id: 'EQ-003', name: 'Smoke Detector #14', type: 'Smoke Detector', location: 'Warehouse B', floor: '1st Floor', status: 'critical', lastInspected: 'Jun 20, 2025', nextDue: 'Jul 20, 2025', serial: 'SMK-2023-014' },
  { id: 'EQ-004', name: 'Fire Hydrant H-05', type: 'Hydrant', location: 'Parking Complex', floor: 'Level 1', status: 'maintenance', lastInspected: 'Jul 01, 2025', nextDue: 'Jul 28, 2025', serial: 'HYD-2022-005' },
  { id: 'EQ-005', name: 'Exit Light EL-3B', type: 'Exit Light', location: 'Office Block C', floor: '3rd Floor, Stairwell', status: 'critical', lastInspected: 'Jun 30, 2025', nextDue: 'Jul 15, 2025', serial: 'EXL-2023-003' },
  { id: 'EQ-006', name: 'Alarm Panel AP-01', type: 'Alarm Panel', location: 'Main Building', floor: 'Ground Floor, Control Room', status: 'operational', lastInspected: 'Jul 18, 2025', nextDue: 'Aug 18, 2025', serial: 'ALP-2021-001' },
  { id: 'EQ-007', name: 'Sprinkler Head SP-12', type: 'Sprinkler', location: 'Data Center', floor: 'Server Room B', status: 'operational', lastInspected: 'Jul 12, 2025', nextDue: 'Oct 12, 2025', serial: 'SPR-2022-012' },
  { id: 'EQ-008', name: 'Hose Reel HR-02', type: 'Hose Reel', location: 'Warehouse B', floor: '2nd Floor', status: 'offline', lastInspected: 'Jun 01, 2025', nextDue: 'Jul 01, 2025', serial: 'HSR-2020-002' },
];

const statusConfig: Record<string, { cls: string; label: string }> = {
  operational: { cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', label: 'Operational' },
  critical: { cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', label: 'Critical' },
  maintenance: { cls: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400', label: 'Maintenance' },
  offline: { cls: 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400', label: 'Offline' },
};

const EquipmentInspection: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [equipmentList, setEquipmentList] = useState(equipment);
  const [startingInspection, setStartingInspection] = useState<string | null>(null);

  // QR Scanner Modal State
  const [showScanner, setShowScanner] = useState(false);

  // Inspection Form Modal State
  const [selectedInspectionEq, setSelectedInspectionEq] = useState<typeof equipment[0] | null>(null);
  const [inspectionNotes, setInspectionNotes] = useState('');
  const [inspectionStatus, setInspectionStatus] = useState('operational');

  const filtered = equipmentList.filter(eq => {
    const matchSearch = eq.name.toLowerCase().includes(search.toLowerCase()) ||
      eq.location.toLowerCase().includes(search.toLowerCase()) ||
      eq.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || eq.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStartInspection = (eq: typeof equipment[0]) => {
    setSelectedInspectionEq(eq);
    setInspectionStatus(eq.status);
    setInspectionNotes('');
  };

  const handleSaveInspection = async () => {
    if (!selectedInspectionEq) return;
    setStartingInspection(selectedInspectionEq.id);
    await new Promise(r => setTimeout(r, 800));
    
    setEquipmentList(prev => prev.map(eq => 
      eq.id === selectedInspectionEq.id 
        ? { 
            ...eq, 
            status: inspectionStatus, 
            lastInspected: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            nextDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          } 
        : eq
    ));
    
    setStartingInspection(null);
    setSelectedInspectionEq(null);
    toast.success(`Inspection completed for ${selectedInspectionEq.name}. Status updated to ${statusConfig[inspectionStatus]?.label}.`);
  };

  const handleScanDemoQR = (eqId: string) => {
    const targetEq = equipmentList.find(eq => eq.id === eqId);
    if (targetEq) {
      setShowScanner(false);
      handleStartInspection(targetEq);
      toast.info(`Scanned QR code for ${targetEq.name}`);
    } else {
      toast.error("Equipment not found.");
    }
  };

  const counts = {
    all: equipmentList.length,
    operational: equipmentList.filter(e => e.status === 'operational').length,
    critical: equipmentList.filter(e => e.status === 'critical').length,
    maintenance: equipmentList.filter(e => e.status === 'maintenance').length,
    offline: equipmentList.filter(e => e.status === 'offline').length,
  };

  return (
    <RoleDashboardLayout title="Equipment Inspection">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Equipment Inspection</h2>
            <p className="text-sm text-muted-foreground">Review and inspect all registered fire safety equipment</p>
          </div>
          <Button
            onClick={() => setShowScanner(true)}
            className="gradient-fire text-white border-0 hover:opacity-90 flex-shrink-0"
            size="sm"
          >
            <QrCode className="w-4 h-4 mr-2" />Scan QR Code
          </Button>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'operational', label: 'Operational', value: counts.operational, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
            { key: 'critical', label: 'Critical', value: counts.critical, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
            { key: 'maintenance', label: 'Maintenance', value: counts.maintenance, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' },
            { key: 'offline', label: 'Offline', value: counts.offline, color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700' },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setStatusFilter(statusFilter === s.key ? 'all' : s.key)}
              className={`p-4 rounded-xl border text-left transition-all ${s.bg} ${statusFilter === s.key ? 'ring-2 ring-red-500' : ''}`}
            >
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, location, or ID..."
              className="input-field pl-10"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="input-field w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status ({counts.all})</option>
            <option value="operational">Operational ({counts.operational})</option>
            <option value="critical">Critical ({counts.critical})</option>
            <option value="maintenance">Maintenance ({counts.maintenance})</option>
            <option value="offline">Offline ({counts.offline})</option>
          </select>
        </div>

        {/* Equipment Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium">Equipment</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Location</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Last Inspected</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Next Due</th>
                  <th className="text-left px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(eq => (
                  <tr key={eq.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{eq.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{eq.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{eq.type}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium">{eq.location}</p>
                          <p className="text-xs text-muted-foreground">{eq.floor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[eq.status]?.cls}`}>
                        {statusConfig[eq.status]?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">{eq.lastInspected}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className={`flex items-center gap-1 text-xs ${eq.status === 'critical' || eq.status === 'offline' ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-muted-foreground'}`}>
                        <Clock className="w-3 h-3" />{eq.nextDue}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        size="sm"
                        variant={eq.status === 'critical' || eq.status === 'offline' ? 'default' : 'outline'}
                        className={`text-xs ${eq.status === 'critical' || eq.status === 'offline' ? 'gradient-fire text-white border-0 hover:opacity-90' : ''}`}
                        onClick={() => handleStartInspection(eq)}
                      >
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="block md:hidden divide-y divide-border">
            {filtered.map(eq => (
              <div key={eq.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{eq.name}</h4>
                    <p className="text-[10px] text-muted-foreground font-mono">{eq.id} · {eq.type}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium shrink-0 ${statusConfig[eq.status]?.cls}`}>
                    {statusConfig[eq.status]?.label}
                  </span>
                </div>
                
                <div className="flex items-start gap-1 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">{eq.location}</p>
                    <p className="text-muted-foreground text-[11px]">{eq.floor}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="text-[11px] text-muted-foreground">
                    <p>Last: {eq.lastInspected}</p>
                    <p className={eq.status === 'critical' || eq.status === 'offline' ? 'text-red-500 font-semibold' : ''}>
                      Due: {eq.nextDue}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={eq.status === 'critical' || eq.status === 'offline' ? 'default' : 'outline'}
                    className={`h-8 text-xs shrink-0 ${eq.status === 'critical' || eq.status === 'offline' ? 'gradient-fire text-white border-0 hover:opacity-90' : ''}`}
                    onClick={() => handleStartInspection(eq)}
                  >
                    Inspect
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No equipment matches your search</p>
            </div>
          )}
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Showing {filtered.length} of {equipmentList.length} equipment items</p>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => toast.success("Equipment list exported as CSV successfully!")}
            >
              Export List
            </Button>
          </div>
        </div>
      </div>

      {/* Simulated QR Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setShowScanner(false)}
              className="absolute right-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-red-500" />
              QR Code Scanner (Simulated)
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Point your camera at the AgniSutra equipment tag QR code. Select a demo tag below to simulate a scan.
            </p>

            {/* Simulated camera view */}
            <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-6 flex flex-col items-center justify-center border-2 border-red-500/50">
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-500" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-500" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-500" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-500" />
              <div className="w-full h-[2px] bg-red-500 absolute top-1/2 left-0 animate-pulse shadow-[0_0_8px_#ef4444]" />
              <QrCode className="w-16 h-16 text-white/20 animate-pulse" />
              <span className="text-xs text-white/50 mt-2 font-mono">Camera Active...</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground block mb-1">Simulate Scanning:</span>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'EQ-001', name: 'CO2 Extinguisher (Main Building)' },
                  { id: 'EQ-003', name: 'Smoke Detector #14 (Warehouse B)' },
                  { id: 'EQ-005', name: 'Exit Light EL-3B (Office Block C)' },
                ].map(demo => (
                  <button
                    key={demo.id}
                    onClick={() => handleScanDemoQR(demo.id)}
                    className="w-full p-2.5 rounded-xl border border-border bg-muted/30 hover:bg-muted text-left text-xs font-medium transition-colors flex items-center justify-between"
                  >
                    <span>{demo.name}</span>
                    <span className="text-[10px] font-mono bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded font-bold">{demo.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Inspection Modal */}
      {selectedInspectionEq && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedInspectionEq(null)}
              className="absolute right-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold mb-1">Inspect Equipment</h3>
            <p className="text-xs text-muted-foreground mb-4">Complete the compliance checks below for the selected tag.</p>

            <div className="bg-muted/40 border border-border rounded-xl p-3.5 mb-5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Equipment:</span>
                <span className="font-semibold">{selectedInspectionEq.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Serial / ID:</span>
                <span className="font-mono font-semibold">{selectedInspectionEq.id} ({selectedInspectionEq.serial})</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-semibold">{selectedInspectionEq.location} ({selectedInspectionEq.floor})</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Current Status</label>
                <select
                  className="input-field"
                  value={inspectionStatus}
                  onChange={e => setInspectionStatus(e.target.value)}
                >
                  <option value="operational">Operational</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="critical">Critical (Fails Check)</option>
                  <option value="offline">Offline / Absent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Comments & Observations</label>
                <textarea
                  className="input-field resize-none"
                  rows={3}
                  placeholder="e.g. pressure check green, safety pin in tact, no rust..."
                  value={inspectionNotes}
                  onChange={e => setInspectionNotes(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 text-xs"
                  onClick={() => setSelectedInspectionEq(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 text-xs gradient-fire text-white border-0 hover:opacity-90"
                  onClick={handleSaveInspection}
                  disabled={startingInspection === selectedInspectionEq.id}
                >
                  {startingInspection === selectedInspectionEq.id ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                  ) : (
                    'Submit Inspection'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </RoleDashboardLayout>
  );
};

export default EquipmentInspection;
