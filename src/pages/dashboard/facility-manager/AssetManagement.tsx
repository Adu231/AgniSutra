import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Package, Search, Filter, Building2, Wrench, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const assets = [
  { id: 'AST-001', name: 'CO2 Extinguisher (ABC Type)', facility: 'Hospital Main', location: 'G Floor, Zone A', type: 'Extinguisher', status: 'operational', condition: 'good', installDate: 'Mar 2022', warrantyExpiry: 'Mar 2025', lastService: 'Jul 2025', nextService: 'Aug 2025', value: 2800 },
  { id: 'AST-002', name: 'Smoke Detector (Photoelectric)', facility: 'Diagnostics Center', location: '2nd Floor, Bay 2', type: 'Detector', status: 'critical', condition: 'poor', installDate: 'Jan 2021', warrantyExpiry: 'Jan 2024', lastService: 'Jun 2025', nextService: 'Jul 2025', value: 1200 },
  { id: 'AST-003', name: 'Fire Alarm Panel (8-Zone)', facility: 'Childrens Wing', location: 'Control Room', type: 'Panel', status: 'operational', condition: 'good', installDate: 'Jun 2023', warrantyExpiry: 'Jun 2026', lastService: 'Jul 2025', nextService: 'Oct 2025', value: 45000 },
  { id: 'AST-004', name: 'Wet Risers System (4-Inlet)', facility: 'Hospital Main', location: 'All Floors', type: 'Hydrant', status: 'maintenance', condition: 'fair', installDate: 'Apr 2020', warrantyExpiry: 'Apr 2023', lastService: 'May 2025', nextService: 'Aug 2025', value: 85000 },
  { id: 'AST-005', name: 'Emergency Exit Light', facility: 'Research Block', location: '3F Stairwell', type: 'Exit Light', status: 'critical', condition: 'poor', installDate: 'Jul 2020', warrantyExpiry: 'Jul 2023', lastService: 'Jun 2025', nextService: 'Jul 2025', value: 800 },
  { id: 'AST-006', name: 'Sprinkler System (Wet Pipe)', facility: 'Admin Building', location: 'All Floors', type: 'Sprinkler', status: 'operational', condition: 'excellent', installDate: 'Dec 2023', warrantyExpiry: 'Dec 2026', lastService: 'Jul 2025', nextService: 'Jan 2026', value: 120000 },
  { id: 'AST-007', name: 'Gas Suppression System', facility: 'Research Block', location: 'Server Room', type: 'Suppression', status: 'operational', condition: 'good', installDate: 'Feb 2022', warrantyExpiry: 'Feb 2025', lastService: 'Jun 2025', nextService: 'Sep 2025', value: 220000 },
];

const conditionColors: Record<string, string> = {
  excellent: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  good: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  fair: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
  poor: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
};

const statusColors: Record<string, string> = {
  operational: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  maintenance: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const AssetManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<typeof assets[0] | null>(null);

  const handleExportCSV = () => {
    toast.success('Generating asset CSV export...');
    const headers = ['Asset ID', 'Name', 'Facility', 'Location', 'Type', 'Status', 'Condition', 'Install Date', 'Warranty Expiry', 'Last Service', 'Next Service', 'Value (INR)'];
    const rows = filtered.map(a => [
      a.id,
      a.name,
      a.facility,
      a.location,
      a.type,
      a.status,
      a.condition,
      a.installDate,
      a.warrantyExpiry,
      a.lastService,
      a.nextService,
      a.value.toString()
    ]);
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Asset_Inventory_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filtered = assets.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchFacility = facilityFilter === 'all' || a.facility === facilityFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchFacility && matchStatus;
  });

  const totalValue = filtered.reduce((sum, a) => sum + a.value, 0);

  return (
    <RoleDashboardLayout title="Asset Management">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Asset Management</h2>
            <p className="text-sm text-muted-foreground">Full inventory of fire safety assets across all facilities</p>
          </div>
          <Button size="sm" variant="outline" className="text-xs font-semibold hover:opacity-90" onClick={handleExportCSV}>Export CSV</Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Assets', value: assets.length, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Critical Status', value: assets.filter(a => a.status === 'critical').length, color: 'text-red-600 dark:text-red-400' },
            { label: 'Due for Service', value: 4, color: 'text-orange-600 dark:text-orange-400' },
            { label: 'Total Value', value: `₹${(assets.reduce((s, a) => s + a.value, 0) / 100000).toFixed(1)}L`, color: 'text-purple-600 dark:text-purple-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="input-field pl-10" placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-auto" value={facilityFilter} onChange={e => setFacilityFilter(e.target.value)}>
            <option value="all">All Facilities</option>
            <option>Hospital Main</option>
            <option>Diagnostics Center</option>
            <option>Childrens Wing</option>
            <option>Research Block</option>
            <option>Admin Building</option>
          </select>
          <select className="input-field w-auto" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="operational">Operational</option>
            <option value="maintenance">Maintenance</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Asset Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm">Assets ({filtered.length}) · Total Value: ₹{(totalValue / 100000).toFixed(1)}L</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-xs text-muted-foreground">
                  <th className="text-left px-4 py-3 font-medium">Asset</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Facility</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Condition</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Next Service</th>
                  <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Value</th>
                  <th className="text-left px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(asset => (
                  <tr key={asset.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{asset.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{asset.id} · {asset.location}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Building2 className="w-3 h-3" />{asset.facility}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[asset.status]}`}>{asset.status}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${conditionColors[asset.condition]}`}>{asset.condition}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{asset.nextService}</td>
                    <td className="px-4 py-3 text-xs font-semibold hidden lg:table-cell">₹{asset.value.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="outline" className="text-xs font-semibold hover:opacity-90" onClick={() => setSelectedAsset(asset)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Asset Details Modal */}
        {selectedAsset && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
                <div>
                  <h3 className="font-bold text-base flex items-center gap-2">
                    <Package className="w-4 h-4 text-orange-500" />
                    Asset Details
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">{selectedAsset.id}</p>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Asset Name</p>
                    <p className="font-semibold text-sm">{selectedAsset.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Facility</p>
                    <p className="text-sm font-semibold">{selectedAsset.facility}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Location</p>
                    <p className="text-sm font-semibold">{selectedAsset.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Type</p>
                    <p className="text-sm font-semibold">{selectedAsset.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium text-orange-600 font-bold">Asset Value</p>
                    <p className="text-sm font-black">₹{selectedAsset.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Current Status</p>
                    <span className={`inline-block px-2 py-0.5 mt-1 rounded text-xs font-semibold ${statusColors[selectedAsset.status]}`}>{selectedAsset.status}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Condition</p>
                    <span className={`inline-block px-2 py-0.5 mt-1 rounded text-xs font-semibold ${conditionColors[selectedAsset.condition]}`}>{selectedAsset.condition}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Lifecycle & Audits</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex justify-between border-b border-border/50 pb-1.5"><span className="text-muted-foreground">Installed:</span><span className="font-medium">{selectedAsset.installDate}</span></div>
                    <div className="flex justify-between border-b border-border/50 pb-1.5"><span className="text-muted-foreground">Warranty Expiry:</span><span className="font-medium">{selectedAsset.warrantyExpiry}</span></div>
                    <div className="flex justify-between border-b border-border/50 pb-1.5"><span className="text-muted-foreground">Last Service:</span><span className="font-medium">{selectedAsset.lastService}</span></div>
                    <div className="flex justify-between border-b border-border/50 pb-1.5"><span className="text-muted-foreground">Next Service:</span><span className="font-medium">{selectedAsset.nextService}</span></div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <h4 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">Activity History Log</h4>
                  <div className="relative border-l border-border pl-4 space-y-3 text-xs py-1">
                    <div className="relative"><div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-card" /><span className="text-muted-foreground">Jul 2025:</span> Calibrated and tagged by Suresh Kumar. Status set to operational.</div>
                    <div className="relative"><div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-card" /><span className="text-muted-foreground">May 2024:</span> Routine battery inspection completed.</div>
                    <div className="relative"><div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-card" /><span className="text-muted-foreground">Mar 2022:</span> Initial installation and registration.</div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3 border-t border-border flex justify-end bg-muted/20">
                <Button size="sm" onClick={() => setSelectedAsset(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
};

export default AssetManagement;
