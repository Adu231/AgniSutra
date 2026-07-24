import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Plus, Search, CheckCircle, Clock, AlertTriangle, Calendar, User, Building2, Star } from 'lucide-react';
import { toast } from 'sonner';

const inspections = [
  { id: 'INS001', title: 'Monthly Fire Equipment Inspection', type: 'Routine', facility: 'Main Building', inspector: 'Vikram Nair', scheduledDate: '2025-07-28', status: 'scheduled', score: null, violations: 0 },
  { id: 'INS002', title: 'Annual Fire Safety Audit', type: 'Audit', facility: 'Warehouse Complex', inspector: 'Priya Sharma', scheduledDate: '2025-07-22', completedDate: '2025-07-22', status: 'completed', score: 91, violations: 2 },
  { id: 'INS003', title: 'Emergency Exit Compliance Check', type: 'Compliance', facility: 'Data Center', inspector: 'Arjun Mehta', scheduledDate: '2025-07-15', completedDate: '2025-07-16', status: 'completed', score: 87, violations: 3 },
  { id: 'INS004', title: 'Quarterly Sprinkler System Test', type: 'Maintenance', facility: 'Hospital Wing A', inspector: 'Deepika Rao', scheduledDate: '2025-07-10', status: 'overdue', score: null, violations: 0 },
  { id: 'INS005', title: 'IoT Sensor Calibration Check', type: 'Technical', facility: 'Manufacturing Plant', inspector: 'Rohit Gupta', scheduledDate: '2025-07-25', status: 'in_progress', score: null, violations: 0 },
  { id: 'INS006', title: 'Fire Extinguisher Replacement Audit', type: 'Audit', facility: 'Office Tower B', inspector: 'Kavitha Singh', scheduledDate: '2025-07-05', completedDate: '2025-07-06', status: 'completed', score: 95, violations: 1 },
];

const statusConfig = {
  scheduled: { label: 'Scheduled', cls: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', icon: Calendar },
  in_progress: { label: 'In Progress', cls: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500', icon: Clock },
  completed: { label: 'Completed', cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', icon: CheckCircle },
  overdue: { label: 'Overdue', cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', icon: AlertTriangle },
};

const Inspections: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = inspections.filter(insp => {
    const matchSearch = insp.title.toLowerCase().includes(search.toLowerCase()) || insp.facility.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || insp.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <DashboardLayout title="Inspections">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Scheduled', value: inspections.filter(i => i.status === 'scheduled').length, color: 'text-blue-500' },
            { label: 'In Progress', value: inspections.filter(i => i.status === 'in_progress').length, color: 'text-yellow-600 dark:text-yellow-400' },
            { label: 'Completed', value: inspections.filter(i => i.status === 'completed').length, color: 'text-green-500' },
            { label: 'Overdue', value: inspections.filter(i => i.status === 'overdue').length, color: 'text-red-500' },
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
            <input className="input-field pl-9 h-10 text-sm" placeholder="Search inspections..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-full sm:w-44 h-10 text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <Button className="gradient-fire text-white border-0 h-10 whitespace-nowrap" onClick={() => toast.success('Inspection scheduled!')}>
            <Plus className="w-4 h-4 mr-2" />Schedule Inspection
          </Button>
        </div>

        {/* Inspection Cards */}
        <div className="space-y-4">
          {filtered.map(insp => {
            const status = statusConfig[insp.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            return (
              <div key={insp.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${status.cls}`}>
                        <StatusIcon className="w-3 h-3" />{status.label}
                      </span>
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">{insp.type}</span>
                      {insp.violations > 0 && (
                        <span className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded">
                          {insp.violations} violation{insp.violations > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{insp.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1"><Building2 className="w-3 h-3" />{insp.facility}</div>
                      <div className="flex items-center gap-1"><User className="w-3 h-3" />{insp.inspector}</div>
                      <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />
                        {insp.status === 'completed' ? `Completed ${insp.completedDate}` : `Scheduled ${insp.scheduledDate}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {insp.score !== null && (
                      <div className="text-center">
                        <div className={`text-2xl font-black ${insp.score >= 90 ? 'text-green-500' : insp.score >= 75 ? 'text-yellow-600' : 'text-red-500'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {insp.score}%
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 justify-center"><Star className="w-3 h-3 text-yellow-400" />Score</div>
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing inspection ${insp.id}`)}>View Report</Button>
                      {insp.status === 'scheduled' && (
                        <Button size="sm" className="gradient-fire text-white border-0 text-xs" onClick={() => toast.success('Inspection started!')}>Start</Button>
                      )}
                      {insp.status === 'overdue' && (
                        <Button size="sm" className="bg-red-600 text-white border-0 text-xs hover:bg-red-700" onClick={() => toast.info('Rescheduling inspection...')}>Reschedule</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-16 bg-card border border-border rounded-xl text-muted-foreground">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No inspections found.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inspections;
