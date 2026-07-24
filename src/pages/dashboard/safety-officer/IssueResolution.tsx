import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { AlertOctagon, CheckCircle, Clock, User, MapPin, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const issues = [
  { id: 'ISS-041', type: 'Exit Light Failure', location: 'Office Block C', floor: '3rd Floor, Stairwell', severity: 'high', status: 'open', reportedBy: 'Suresh Kumar', reportedAt: 'Jul 18, 2025', assignedTo: null, description: 'Exit light unit EL-3B is completely non-functional. Battery and LED unit need replacement.' },
  { id: 'ISS-040', type: 'Smoke Detector Offline', location: 'Warehouse B', floor: '1st Floor, Bay 3', severity: 'critical', status: 'open', reportedBy: 'IoT System', reportedAt: 'Jul 22, 2025', assignedTo: 'Rajesh Singh', description: 'Smoke detector SMK-014 has been offline for 48+ hours. Power connection suspected.' },
  { id: 'ISS-039', type: 'Hydrant Pressure Low', location: 'Parking Complex', floor: 'Level 1, West Side', severity: 'medium', status: 'in_progress', reportedBy: 'Arjun Mehta', reportedAt: 'Jul 15, 2025', assignedTo: 'Rajesh Singh', description: 'Hydrant H-05 pressure reading below threshold. Valve inspection underway.' },
  { id: 'ISS-038', type: 'Extinguisher Overdue', location: 'Canteen', floor: 'Ground Floor', severity: 'low', status: 'resolved', reportedBy: 'Vikram Nair', reportedAt: 'Jul 10, 2025', assignedTo: 'Rajesh Singh', description: 'Wet chemical extinguisher missed monthly inspection. Inspection completed.' },
  { id: 'ISS-037', type: 'Alarm Panel Fault', location: 'Main Building', floor: 'Control Room', severity: 'high', status: 'resolved', reportedBy: 'IoT System', reportedAt: 'Jul 08, 2025', assignedTo: 'Rajesh Singh', description: 'Alarm panel showed zone fault for Zone C. Wiring reconnected and tested.' },
];

const severityConfig: Record<string, string> = {
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
  low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
};

const statusConfig: Record<string, string> = {
  open: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  in_progress: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  resolved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
};

const IssueResolution: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<typeof issues[0] | null>(null);
  const [resolveNote, setResolveNote] = useState('');
  const [assignedTech, setAssignedTech] = useState('');
  const [resolving, setResolving] = useState(false);
  const [issueList, setIssueList] = useState(issues);

  const filtered = filter === 'all' ? issueList : issueList.filter(i => i.status === filter || i.severity === filter);

  const handleResolve = async () => {
    if (!resolveNote.trim()) { toast.error('Please add a resolution note.'); return; }
    setResolving(true);
    await new Promise(r => setTimeout(r, 1000));
    setIssueList(prev => prev.map(i => i.id === selectedIssue?.id ? { ...i, status: 'resolved', assignedTo: assignedTech || i.assignedTo || 'You' } : i));
    setResolving(false);
    setSelectedIssue(null);
    setResolveNote('');
    toast.success(`Issue ${selectedIssue?.id} marked as resolved.`);
  };

  const handleAssign = async () => {
    if (!assignedTech) { toast.error('Please select a technician.'); return; }
    setIssueList(prev => prev.map(i => i.id === selectedIssue?.id ? { ...i, status: 'in_progress', assignedTo: assignedTech } : i));
    toast.success(`Issue assigned to ${assignedTech}`);
    setSelectedIssue(null);
  };

  return (
    <RoleDashboardLayout title="Issue Resolution">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Issue Resolution</h2>
          <p className="text-sm text-muted-foreground">Track, assign, and resolve reported fire safety issues</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Critical', count: issueList.filter(i => i.severity === 'critical' && i.status !== 'resolved').length, color: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800', key: 'critical' },
            { label: 'Open', count: issueList.filter(i => i.status === 'open').length, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800', key: 'open' },
            { label: 'In Progress', count: issueList.filter(i => i.status === 'in_progress').length, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', key: 'in_progress' },
            { label: 'Resolved', count: issueList.filter(i => i.status === 'resolved').length, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', key: 'resolved' },
          ].map(s => (
            <button key={s.key} onClick={() => setFilter(filter === s.key ? 'all' : s.key)} className={`p-4 rounded-xl border text-left transition-all ${s.color} ${filter === s.key ? 'ring-2 ring-red-500' : ''}`}>
              <div className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.count}</div>
              <div className="text-xs mt-0.5">{s.label} Issues</div>
            </button>
          ))}
        </div>

        {/* Issues List */}
        <div className="space-y-3">
          {filtered.map(issue => (
            <div key={issue.id} className={`bg-card border rounded-xl p-4 ${issue.status === 'resolved' ? 'border-border opacity-70' : 'border-border'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <AlertOctagon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${issue.severity === 'critical' ? 'text-red-600' : issue.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{issue.type}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${severityConfig[issue.severity]}`}>{issue.severity}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[issue.status]}`}>{issue.status.replace('_', ' ')}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{issue.location} · {issue.floor}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{issue.reportedAt}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />Reported by {issue.reportedBy}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{issue.description}</p>
                    {issue.assignedTo && <p className="text-xs mt-1 text-blue-600 dark:text-blue-400">Assigned to: {issue.assignedTo}</p>}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {issue.status !== 'resolved' && (
                    <Button size="sm" className="gradient-fire text-white border-0 text-xs" onClick={() => { setSelectedIssue(issue); setAssignedTech(issue.assignedTo || ''); }}>
                      {issue.status === 'open' ? 'Assign & Resolve' : 'Resolve'}
                    </Button>
                  )}
                  {issue.status === 'resolved' && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resolution Modal */}
        {selectedIssue && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Resolve Issue: {selectedIssue.id}</h3>
                <button onClick={() => setSelectedIssue(null)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{selectedIssue.type} at {selectedIssue.location}</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Assign Technician</label>
                  <select className="input-field" value={assignedTech} onChange={e => setAssignedTech(e.target.value)}>
                    <option value="">Select technician...</option>
                    <option value="Rajesh Singh">Rajesh Singh</option>
                    <option value="Mohan Kumar">Mohan Kumar</option>
                    <option value="Priya Technician">Priya Technician</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Resolution Notes *</label>
                  <textarea className="input-field resize-none" rows={3} placeholder="Describe actions taken to resolve this issue..." value={resolveNote} onChange={e => setResolveNote(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1" onClick={handleAssign}>Assign Only</Button>
                  <Button className="flex-1 gradient-fire text-white border-0 hover:opacity-90" size="sm" onClick={handleResolve} disabled={resolving}>
                    {resolving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Mark Resolved'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
};

export default IssueResolution;
