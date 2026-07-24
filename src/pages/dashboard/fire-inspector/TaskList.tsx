import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Search, Filter, Clock, MapPin, Play, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const allTasks = [
  { id: 'TSK-091', facility: 'Main Building', floor: 'G Floor, Zone A', type: 'Extinguisher Check', priority: 'high', due: 'Jul 28 · 10:00 AM', assigned: 'Jul 25', status: 'pending', estimatedTime: '45 min', items: 12 },
  { id: 'TSK-092', facility: 'Warehouse B', floor: '1st Floor, Bay 2', type: 'Smoke Detector Test', priority: 'critical', due: 'Jul 28 · 11:30 AM', assigned: 'Jul 25', status: 'pending', estimatedTime: '30 min', items: 8 },
  { id: 'TSK-093', facility: 'Data Center', floor: 'Server Room A', type: 'Suppression System Check', priority: 'medium', due: 'Jul 28 · 02:00 PM', assigned: 'Jul 25', status: 'in_progress', estimatedTime: '60 min', items: 15 },
  { id: 'TSK-094', facility: 'Office Block C', floor: 'All Floors', type: 'Exit Light Inspection', priority: 'high', due: 'Jul 28 · 04:00 PM', assigned: 'Jul 26', status: 'pending', estimatedTime: '90 min', items: 24 },
  { id: 'TSK-090', facility: 'Parking Complex', floor: 'Level 1 & 2', type: 'Hydrant Check', priority: 'medium', due: 'Jul 27 · 09:00 AM', assigned: 'Jul 24', status: 'overdue', estimatedTime: '40 min', items: 6 },
  { id: 'TSK-089', facility: 'Main Building', floor: '3rd Floor', type: 'Heat Detector Test', priority: 'low', due: 'Jul 30 · 10:00 AM', assigned: 'Jul 26', status: 'pending', estimatedTime: '25 min', items: 9 },
  { id: 'TSK-088', facility: 'Warehouse B', floor: '2nd Floor', type: 'Hose Reel Inspection', priority: 'medium', due: 'Jul 31 · 11:00 AM', assigned: 'Jul 25', status: 'pending', estimatedTime: '35 min', items: 7 },
  { id: 'TSK-087', facility: 'Main Building', floor: 'G Floor', type: 'Monthly Fire Inspection', status: 'completed', priority: 'high', due: 'Jul 22 · 09:00 AM', assigned: 'Jul 19', estimatedTime: '120 min', items: 48 },
];

const statusConfig: Record<string, string> = {
  pending: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  in_progress: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  overdue: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const priorityConfig: Record<string, string> = {
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  low: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
};

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filtered = allTasks.filter(t => {
    const matchSearch = t.type.toLowerCase().includes(search.toLowerCase()) || t.facility.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <RoleDashboardLayout title="My Task List">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">My Task List</h2>
          <p className="text-sm text-muted-foreground">All assigned inspection tasks with priority and due dates</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Pending', count: allTasks.filter(t => t.status === 'pending').length, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800', key: 'pending' },
            { label: 'In Progress', count: allTasks.filter(t => t.status === 'in_progress').length, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', key: 'in_progress' },
            { label: 'Overdue', count: allTasks.filter(t => t.status === 'overdue').length, color: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800', key: 'overdue' },
            { label: 'Completed', count: allTasks.filter(t => t.status === 'completed').length, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', key: 'completed' },
          ].map(s => (
            <button key={s.key} onClick={() => setStatusFilter(statusFilter === s.key ? 'all' : s.key)} className={`p-4 rounded-xl border text-left transition-all ${s.color} ${statusFilter === s.key ? 'ring-2 ring-orange-500' : ''}`}>
              <div className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.count}</div>
              <div className="text-xs mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="input-field pl-10" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-auto" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          {filtered.map(task => (
            <div key={task.id} className={`bg-card border border-border rounded-xl p-4 ${task.status === 'overdue' ? 'border-red-200 dark:border-red-800/50' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{task.type}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${priorityConfig[task.priority]}`}>{task.priority}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusConfig[task.status]}`}>{task.status.replace('_', ' ')}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{task.facility} · {task.floor}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Due: {task.due}</span>
                    <span>{task.items} checklist items · ~{task.estimatedTime}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {task.status !== 'completed' && (
                    <Button size="sm" className="text-xs gradient-fire text-white border-0 hover:opacity-90" onClick={() => navigate('/dashboard/fire-inspector/inspect')}>
                      <Play className="w-3 h-3 mr-1" />Start
                    </Button>
                  )}
                  {task.status === 'completed' && (
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success('Report opened')}>
                      <Eye className="w-3 h-3 mr-1" />View
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default TaskList;
