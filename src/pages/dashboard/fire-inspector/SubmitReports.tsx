import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Send, FileText, CheckCircle, AlertTriangle, Download, Eye, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const submittedReports = [
  { id: 'RPT-INS-031', title: 'Monthly Fire Inspection — Main Building', score: 96, status: 'accepted', date: 'Jul 22, 2025', violations: 0, items: 48 },
  { id: 'RPT-INS-030', title: 'Smoke Detector Test — Warehouse B', score: 72, status: 'review', date: 'Jul 20, 2025', violations: 2, items: 8 },
  { id: 'RPT-INS-029', title: 'Exit Light Inspection — Office Block C', score: 65, status: 'rejected', date: 'Jul 18, 2025', violations: 4, items: 24 },
  { id: 'RPT-INS-028', title: 'Extinguisher Check — Data Center', score: 100, status: 'accepted', date: 'Jul 15, 2025', violations: 0, items: 12 },
];

const SubmitReports: React.FC = () => {
  const [draftOpen, setDraftOpen] = useState(false);
  const [draft, setDraft] = useState({ title: '', facility: '', inspectionId: '', score: '', findings: '', recommendations: '', signature: false });
  const [submitting, setSubmitting] = useState(false);
  const [reports, setReports] = useState(submittedReports);

  const handleSubmitReport = async () => {
    if (!draft.title || !draft.facility) { toast.error('Please fill required fields.'); return; }
    if (!draft.signature) { toast.error('Please add your digital signature to submit.'); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    const newReport = {
      id: `RPT-INS-${Date.now()}`,
      title: draft.title,
      score: Number(draft.score) || 85,
      status: 'review' as const,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      violations: 0,
      items: 20,
    };
    setReports(prev => [newReport, ...prev]);
    setSubmitting(false);
    setDraftOpen(false);
    setDraft({ title: '', facility: '', inspectionId: '', score: '', findings: '', recommendations: '', signature: false });
    toast.success('Report submitted for review!');
  };

  const statusConfig: Record<string, string> = {
    accepted: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    review: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  };

  return (
    <RoleDashboardLayout title="Submit Reports">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Submit Inspection Reports</h2>
            <p className="text-sm text-muted-foreground">Create, sign, and submit inspection reports for review</p>
          </div>
          <Button className="gradient-fire text-white border-0 hover:opacity-90 flex-shrink-0" size="sm" onClick={() => setDraftOpen(!draftOpen)}>
            <PenLine className="w-4 h-4 mr-2" />New Report
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Submitted', value: reports.length, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Accepted', value: reports.filter(r => r.status === 'accepted').length, color: 'text-green-600 dark:text-green-400' },
            { label: 'Under Review', value: reports.filter(r => r.status === 'review').length, color: 'text-yellow-600 dark:text-yellow-400' },
            { label: 'Rejected', value: reports.filter(r => r.status === 'rejected').length, color: 'text-red-600 dark:text-red-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Report Draft Form */}
        {draftOpen && (
          <div className="bg-card border border-orange-200 dark:border-orange-800/50 rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold">Draft New Inspection Report</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Report Title *</label>
                <input className="input-field" placeholder="e.g. Monthly Fire Inspection — Building A" value={draft.title} onChange={e => setDraft(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Facility *</label>
                <select className="input-field" value={draft.facility} onChange={e => setDraft(p => ({ ...p, facility: e.target.value }))}>
                  <option value="">Select facility...</option>
                  <option>Main Building</option>
                  <option>Warehouse B</option>
                  <option>Data Center</option>
                  <option>Office Block C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Inspection Reference ID</label>
                <input className="input-field" placeholder="e.g. INS-091" value={draft.inspectionId} onChange={e => setDraft(p => ({ ...p, inspectionId: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Compliance Score (%)</label>
                <input className="input-field" type="number" min="0" max="100" placeholder="e.g. 92" value={draft.score} onChange={e => setDraft(p => ({ ...p, score: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Key Findings</label>
                <textarea className="input-field resize-none" rows={3} placeholder="Summarize key findings and violations..." value={draft.findings} onChange={e => setDraft(p => ({ ...p, findings: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Recommendations</label>
                <textarea className="input-field resize-none" rows={2} placeholder="Recommended corrective actions..." value={draft.recommendations} onChange={e => setDraft(p => ({ ...p, recommendations: e.target.value }))} />
              </div>
            </div>
            {/* Digital Signature */}
            <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${draft.signature ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-dashed border-border hover:border-orange-400'}`} onClick={() => setDraft(p => ({ ...p, signature: !p.signature }))}>
              <div className="flex items-center gap-3">
                {draft.signature ? <CheckCircle className="w-5 h-5 text-green-500" /> : <PenLine className="w-5 h-5 text-muted-foreground" />}
                <div>
                  <p className="text-sm font-medium">{draft.signature ? 'Report Digitally Signed' : 'Click to Add Digital Signature'}</p>
                  <p className="text-xs text-muted-foreground">By signing, you confirm the accuracy of this inspection report</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setDraftOpen(false)}>Cancel</Button>
              <Button className="gradient-fire text-white border-0 hover:opacity-90" size="sm" onClick={handleSubmitReport} disabled={submitting}>
                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4 mr-2" />Submit Report</>}
              </Button>
            </div>
          </div>
        )}

        {/* Submitted Reports */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm">Submitted Reports</h3>
          </div>
          <div className="divide-y divide-border">
            {reports.map(report => (
              <div key={report.id} className="px-4 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{report.title}</p>
                  <div className="flex gap-3 mt-0.5">
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                    <span className="text-xs text-muted-foreground">{report.items} items</span>
                    {report.violations > 0 && <span className="text-xs text-red-600 dark:text-red-400 flex items-center gap-0.5"><AlertTriangle className="w-3 h-3" />{report.violations} violations</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`text-sm font-bold px-2 py-0.5 rounded ${report.score >= 90 ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : report.score >= 75 ? 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>{report.score}%</div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[report.status]}`}>{report.status}</span>
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.success('Report downloaded')}><Download className="w-3 h-3" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default SubmitReports;
