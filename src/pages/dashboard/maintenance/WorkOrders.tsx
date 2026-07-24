import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Search, Wrench, Clock, MapPin, ChevronDown, CheckCircle, AlertTriangle, Play, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const workOrders = [
  { id: 'WO-088', equipment: 'Smoke Detector SMK-014', type: 'Replacement', location: 'Warehouse B', floor: 'Bay 2', priority: 'urgent', status: 'open', assignedTo: 'Rajesh Singh', dueDate: 'Jul 28, 2025', created: 'Jul 25, 2025', description: 'Device offline — power and unit replacement needed', estimatedHours: 1.5 },
  { id: 'WO-089', equipment: 'Exit Light EL-3B', type: 'Repair', location: 'Office Block C', floor: '3F Stairwell', priority: 'high', status: 'open', assignedTo: 'Rajesh Singh', dueDate: 'Jul 29, 2025', created: 'Jul 25, 2025', description: 'LED and battery replacement for non-functional exit light', estimatedHours: 0.5 },
  { id: 'WO-087', equipment: 'Hydrant H-05', type: 'Inspection', location: 'Parking Complex', floor: 'Level 1', priority: 'high', status: 'in_progress', assignedTo: 'Rajesh Singh', dueDate: 'Jul 30, 2025', created: 'Jul 24, 2025', description: 'Low pressure issue — valve and supply line inspection', estimatedHours: 2 },
  { id: 'WO-086', equipment: 'Alarm Panel AP-02', type: 'Calibration', location: 'Warehouse B', floor: 'Control Room', priority: 'medium', status: 'parts_awaited', assignedTo: 'Rajesh Singh', dueDate: 'Aug 02, 2025', created: 'Jul 23, 2025', description: 'Zone 3 sensor calibration — replacement part ordered', estimatedHours: 3 },
  { id: 'WO-085', equipment: 'Hose Reel HR-02', type: 'Service', location: 'Warehouse B', floor: '2nd Floor', priority: 'medium', status: 'open', assignedTo: 'Mohan Kumar', dueDate: 'Aug 05, 2025', created: 'Jul 22, 2025', description: 'Annual service — hose, nozzle, and valve check', estimatedHours: 1 },
  { id: 'WO-084', equipment: 'Extinguisher EXT-015', type: 'Refill', location: 'Canteen', floor: 'Ground Floor', priority: 'low', status: 'completed', assignedTo: 'Rajesh Singh', dueDate: 'Jul 25, 2025', created: 'Jul 20, 2025', description: 'CO2 cartridge refill after discharge during drill', estimatedHours: 0.5 },
];

const priorityConfig: Record<string, string> = {
  urgent: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  low: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
};

const statusConfig: Record<string, string> = {
  open: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  in_progress: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  parts_awaited: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
};

const WorkOrders: React.FC = () => {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState(workOrders);

  const filtered = orders.filter(wo => {
    const matchSearch = wo.equipment.toLowerCase().includes(search.toLowerCase()) || wo.location.toLowerCase().includes(search.toLowerCase()) || wo.id.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === 'all' || wo.priority === priorityFilter;
    const matchStatus = statusFilter === 'all' || wo.status === statusFilter;
    return matchSearch && matchPriority && matchStatus;
  });

  const handleStart = async (id: string) => {
    setOrders(prev => prev.map(wo => wo.id === id ? { ...wo, status: 'in_progress' } : wo));
    toast.success(`Work order ${id} started.`);
  };

  const handleComplete = async (id: string) => {
    setOrders(prev => prev.map(wo => wo.id === id ? { ...wo, status: 'completed' } : wo));
    toast.success(`Work order ${id} completed.`);
  };

  return (
    <RoleDashboardLayout title="Work Orders">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Work Orders</h2>
          <p className="text-sm text-muted-foreground">View and manage all assigned maintenance work orders</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: 'open', label: 'Open', count: orders.filter(wo => wo.status === 'open').length, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' },
            { key: 'in_progress', label: 'In Progress', count: orders.filter(wo => wo.status === 'in_progress').length, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
            { key: 'parts_awaited', label: 'Parts Needed', count: orders.filter(wo => wo.status === 'parts_awaited').length, color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' },
            { key: 'completed', label: 'Completed', count: orders.filter(wo => wo.status === 'completed').length, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
          ].map(s => (
            <button key={s.key} onClick={() => setStatusFilter(statusFilter === s.key ? 'all' : s.key)} className={`p-4 rounded-xl border text-left transition-all ${s.color} ${statusFilter === s.key ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.count}</div>
              <div className="text-xs mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="input-field pl-10" placeholder="Search work orders..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-auto" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Work Order Cards */}
        <div className="space-y-3">
          {filtered.map(wo => (
            <div key={wo.id} className={`bg-card border border-border rounded-xl p-4 ${wo.priority === 'urgent' ? 'border-l-4 border-l-red-500' : wo.priority === 'high' ? 'border-l-4 border-l-orange-500' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-muted-foreground">{wo.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${priorityConfig[wo.priority]}`}>{wo.priority}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusConfig[wo.status]}`}>{wo.status.replace('_', ' ')}</span>
                  </div>
                  <p className="text-sm font-semibold mb-1">{wo.equipment} — <span className="font-normal text-muted-foreground">{wo.type}</span></p>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{wo.location} · {wo.floor}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Due: {wo.dueDate}</span>
                    <span>~{wo.estimatedHours}h</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{wo.description}</p>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {wo.status === 'open' && (
                    <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700 text-white border-0" onClick={() => handleStart(wo.id)}>
                      <Play className="w-3 h-3 mr-1" />Start
                    </Button>
                  )}
                  {wo.status === 'in_progress' && (
                    <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700 text-white border-0" onClick={() => handleComplete(wo.id)}>
                      <CheckCircle className="w-3 h-3 mr-1" />Complete
                    </Button>
                  )}
                  {wo.status === 'parts_awaited' && (
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success('Parts status updated')}>Parts In</Button>
                  )}
                  {wo.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default WorkOrders;
