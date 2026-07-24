import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertTriangle, Clock, Calendar, FileText, Plus, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const requirements = [
  { id: 'R001', title: 'Fire NOC Renewal', standard: 'Local Fire Department', dueDate: '2025-08-15', status: 'due_soon', priority: 'high', category: 'License' },
  { id: 'R002', title: 'NBC 2016 – Section 4 Compliance', standard: 'National Building Code', dueDate: '2025-09-30', status: 'compliant', priority: 'medium', category: 'Structural' },
  { id: 'R003', title: 'Annual Fire Safety Audit', standard: 'TAC Guidelines', dueDate: '2025-07-31', status: 'overdue', priority: 'critical', category: 'Audit' },
  { id: 'R004', title: 'Sprinkler System Certification', standard: 'NFPA 13', dueDate: '2025-10-15', status: 'compliant', priority: 'medium', category: 'Equipment' },
  { id: 'R005', title: 'Emergency Lighting Standards', standard: 'IS 1944', dueDate: '2025-08-01', status: 'non_compliant', priority: 'high', category: 'Equipment' },
  { id: 'R006', title: 'Fire Extinguisher Annual Test', standard: 'IS 2190', dueDate: '2025-09-01', status: 'compliant', priority: 'low', category: 'Equipment' },
  { id: 'R007', title: 'Staff Fire Safety Training', standard: 'NBC Chapter 4', dueDate: '2025-08-30', status: 'in_progress', priority: 'medium', category: 'Training' },
  { id: 'R008', title: 'Fire Risk Assessment Documentation', standard: 'FSO 2022', dueDate: '2025-11-30', status: 'compliant', priority: 'low', category: 'Documentation' },
];

const statusConfig = {
  compliant: { label: 'Compliant', cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', icon: CheckCircle },
  non_compliant: { label: 'Non-Compliant', cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', icon: AlertTriangle },
  due_soon: { label: 'Due Soon', cls: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500', icon: Clock },
  overdue: { label: 'Overdue', cls: 'bg-red-600 text-white', icon: AlertTriangle },
  in_progress: { label: 'In Progress', cls: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', icon: Clock },
};

const priorityConfig = {
  critical: 'text-red-600 dark:text-red-400',
  high: 'text-orange-600 dark:text-orange-400',
  medium: 'text-yellow-700 dark:text-yellow-500',
  low: 'text-green-600 dark:text-green-400',
};

const Compliance: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = requirements.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const overallScore = Math.round((requirements.filter(r => r.status === 'compliant').length / requirements.length) * 100);

  const categories = Array.from(new Set(requirements.map(r => r.category)));
  const categoryScores = categories.map(cat => ({
    cat,
    total: requirements.filter(r => r.category === cat).length,
    compliant: requirements.filter(r => r.category === cat && r.status === 'compliant').length,
  }));

  return (
    <DashboardLayout title="Compliance Management">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Compliance Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Card */}
          <div className="bg-gradient-to-br from-slate-900 via-red-950/40 to-slate-900 border border-red-900/30 rounded-2xl p-6 text-center">
            <Shield className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <div className="text-5xl font-black text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{overallScore}%</div>
            <p className="text-white/60 text-sm">Overall Compliance Score</p>
            <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
              <div className="h-full gradient-fire rounded-full" style={{ width: `${overallScore}%` }} />
            </div>
          </div>

          {/* Status Summary */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Compliant', value: requirements.filter(r => r.status === 'compliant').length, color: 'text-green-500' },
              { label: 'In Progress', value: requirements.filter(r => r.status === 'in_progress').length, color: 'text-blue-500' },
              { label: 'Due Soon', value: requirements.filter(r => r.status === 'due_soon').length, color: 'text-yellow-600 dark:text-yellow-400' },
              { label: 'Non-Compliant / Overdue', value: requirements.filter(r => ['non_compliant', 'overdue'].includes(r.status)).length, color: 'text-red-500' },
            ].map(s => (
              <div key={s.label} className="metric-card">
                <div className={`text-3xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Compliance by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categoryScores.map(c => (
              <div key={c.cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{c.cat}</span>
                  <span className="text-muted-foreground">{c.compliant}/{c.total}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${c.compliant === c.total ? 'bg-green-500' : c.compliant === 0 ? 'bg-red-500' : 'gradient-fire'}`} style={{ width: `${(c.compliant / c.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input className="input-field flex-1 h-10 text-sm" placeholder="Search compliance requirements..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="input-field w-full sm:w-48 h-10 text-sm" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="compliant">Compliant</option>
            <option value="non_compliant">Non-Compliant</option>
            <option value="due_soon">Due Soon</option>
            <option value="overdue">Overdue</option>
            <option value="in_progress">In Progress</option>
          </select>
          <Button className="gradient-fire text-white border-0 h-10 whitespace-nowrap" onClick={() => toast.success('Compliance requirement added!')}>
            <Plus className="w-4 h-4 mr-2" />Add Requirement
          </Button>
        </div>

        {/* Requirements List */}
        <div className="space-y-3">
          {filtered.map(req => {
            const sc = statusConfig[req.status as keyof typeof statusConfig];
            const StatusIcon = sc.icon;
            return (
              <div key={req.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${sc.cls}`}>
                        <StatusIcon className="w-3 h-3" />{sc.label}
                      </span>
                      <span className={`text-xs font-bold uppercase ${priorityConfig[req.priority as keyof typeof priorityConfig]}`}>{req.priority}</span>
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">{req.category}</span>
                    </div>
                    <h4 className="font-semibold">{req.title}</h4>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1"><Shield className="w-3 h-3" />{req.standard}</div>
                      <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />Due: {req.dueDate}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing report for ${req.id}`)}>
                      <FileText className="w-3.5 h-3.5 mr-1" />Report
                    </Button>
                    {['non_compliant', 'overdue', 'due_soon'].includes(req.status) && (
                      <Button size="sm" className="gradient-fire text-white border-0 text-xs" onClick={() => toast.success('Action plan created!')}>
                        Fix Now <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 bg-card border border-border rounded-xl text-muted-foreground">
              <Shield className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No compliance requirements found.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Compliance;
