import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Activity, Search, CheckCircle, Save, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type EquipmentStatusType = 'operational' | 'maintenance' | 'critical' | 'offline';

const equipmentList = [
  { id: 'EQ-001', name: 'CO2 Extinguisher', location: 'Main Building, G Floor Zone A', currentStatus: 'operational' as EquipmentStatusType, lastUpdated: 'Jul 22, 2025', lastUpdatedBy: 'Rajesh Singh' },
  { id: 'EQ-014', name: 'Smoke Detector SMK-014', location: 'Warehouse B, Bay 2', currentStatus: 'offline' as EquipmentStatusType, lastUpdated: 'Jul 20, 2025', lastUpdatedBy: 'IoT System' },
  { id: 'EQ-003', name: 'Exit Light EL-3B', location: 'Office Block C, 3F Stairwell', currentStatus: 'critical' as EquipmentStatusType, lastUpdated: 'Jul 18, 2025', lastUpdatedBy: 'Suresh Kumar' },
  { id: 'EQ-005', name: 'Hydrant H-05', location: 'Parking Complex, Level 1', currentStatus: 'maintenance' as EquipmentStatusType, lastUpdated: 'Jul 15, 2025', lastUpdatedBy: 'Rajesh Singh' },
  { id: 'EQ-006', name: 'Alarm Panel AP-01', location: 'Main Building, Control Room', currentStatus: 'operational' as EquipmentStatusType, lastUpdated: 'Jul 18, 2025', lastUpdatedBy: 'Mohan Kumar' },
  { id: 'EQ-008', name: 'Hose Reel HR-02', location: 'Warehouse B, 2nd Floor', currentStatus: 'offline' as EquipmentStatusType, lastUpdated: 'Jun 01, 2025', lastUpdatedBy: 'System' },
];

const statusOptions: { value: EquipmentStatusType; label: string; cls: string }[] = [
  { value: 'operational', label: 'Operational', cls: 'text-green-600 dark:text-green-400' },
  { value: 'maintenance', label: 'Under Maintenance', cls: 'text-orange-600 dark:text-orange-400' },
  { value: 'critical', label: 'Critical', cls: 'text-red-600 dark:text-red-400' },
  { value: 'offline', label: 'Offline', cls: 'text-gray-500 dark:text-gray-400' },
];

const statusBadge: Record<EquipmentStatusType, string> = {
  operational: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  maintenance: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  offline: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
};

const EquipmentStatus: React.FC = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState(equipmentList.map(e => ({ ...e, newStatus: e.currentStatus, note: '' })));
  const [saving, setSaving] = useState<string | null>(null);

  const filtered = items.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleStatusChange = (id: string, status: EquipmentStatusType) => {
    setItems(prev => prev.map(e => e.id === id ? { ...e, newStatus: status } : e));
  };

  const handleNoteChange = (id: string, note: string) => {
    setItems(prev => prev.map(e => e.id === id ? { ...e, note } : e));
  };

  const handleSave = async (id: string) => {
    setSaving(id);
    await new Promise(r => setTimeout(r, 800));
    setItems(prev => prev.map(e => e.id === id ? {
      ...e,
      currentStatus: e.newStatus,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUpdatedBy: 'Rajesh Singh',
    } : e));
    setSaving(null);
    toast.success(`Equipment ${id} status updated to ${items.find(e => e.id === id)?.newStatus}`);
  };

  const changedCount = items.filter(e => e.newStatus !== e.currentStatus).length;

  return (
    <RoleDashboardLayout title="Equipment Status Update">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Update Equipment Status</h2>
            <p className="text-sm text-muted-foreground">Update equipment operational status after service or inspection</p>
          </div>
          {changedCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400">{changedCount} unsaved change{changedCount !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statusOptions.map(s => (
            <div key={s.value} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.cls}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{items.filter(e => e.currentStatus === s.value).length}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="input-field pl-10" placeholder="Search equipment..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Equipment Status Update Cards */}
        <div className="space-y-3">
          {filtered.map(item => {
            const hasChanged = item.newStatus !== item.currentStatus;
            return (
              <div key={item.id} className={`bg-card border rounded-xl p-4 transition-all ${hasChanged ? 'border-blue-300 dark:border-blue-700 shadow-sm' : 'border-border'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <span className="font-mono text-xs text-muted-foreground">{item.id}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{item.location}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">Current:</span>
                      <span className={`px-2 py-0.5 rounded font-medium ${statusBadge[item.currentStatus]}`}>{item.currentStatus}</span>
                      {hasChanged && (
                        <>
                          <span className="text-muted-foreground">→</span>
                          <span className={`px-2 py-0.5 rounded font-medium ${statusBadge[item.newStatus]}`}>{item.newStatus}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-start flex-shrink-0">
                    <select
                      className="input-field w-auto text-sm"
                      value={item.newStatus}
                      onChange={e => handleStatusChange(item.id, e.target.value as EquipmentStatusType)}
                    >
                      {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    {hasChanged && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white border-0 text-xs"
                        onClick={() => handleSave(item.id)}
                        disabled={saving === item.id}
                      >
                        {saving === item.id ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-3 h-3 mr-1" />Save</>}
                      </Button>
                    )}
                  </div>
                </div>
                {hasChanged && (
                  <div className="mt-3">
                    <input
                      className="input-field text-xs"
                      placeholder="Reason for status change (optional)..."
                      value={item.note}
                      onChange={e => handleNoteChange(item.id, e.target.value)}
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-2">Last updated: {item.lastUpdated} by {item.lastUpdatedBy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default EquipmentStatus;
