import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { FileText, Download, Plus, Filter, Calendar, CheckCircle, BarChart3, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const existingReports = [
  { id: 'RPT-2025-031', name: 'Monthly Compliance Report — July 2025', type: 'Monthly Compliance', facility: 'All Facilities', score: 94, generated: 'Jul 22, 2025', status: 'ready', pages: 24 },
  { id: 'RPT-2025-028', name: 'Equipment Health Audit — Q2 2025', type: 'Equipment Audit', facility: 'Main Building', score: 88, generated: 'Jul 01, 2025', status: 'ready', pages: 18 },
  { id: 'RPT-2025-024', name: 'Compliance Report — June 2025', type: 'Monthly Compliance', facility: 'All Facilities', score: 88, generated: 'Jun 22, 2025', status: 'ready', pages: 22 },
  { id: 'RPT-2025-020', name: 'Warehouse B Fire Safety Audit', type: 'Facility Audit', facility: 'Warehouse B', score: 76, generated: 'Jun 10, 2025', status: 'ready', pages: 31 },
  { id: 'RPT-2025-015', name: 'NBC Compliance Summary — May 2025', type: 'Regulatory', facility: 'All Facilities', score: 85, generated: 'May 28, 2025', status: 'ready', pages: 42 },
  { id: 'RPT-2025-012', name: 'Incident Analysis Report — Q1 2025', type: 'Incident Analysis', facility: 'All Facilities', score: null, generated: 'Apr 05, 2025', status: 'ready', pages: 16 },
];

const reportTypes = [
  { id: 'monthly', label: 'Monthly Compliance Report', icon: Shield, description: 'Full compliance summary across all facilities' },
  { id: 'equipment', label: 'Equipment Health Report', icon: BarChart3, description: 'Equipment status, maintenance, and inspection history' },
  { id: 'facility', label: 'Facility Audit Report', icon: FileText, description: 'Detailed facility-specific compliance audit' },
  { id: 'incident', label: 'Incident Analysis Report', icon: CheckCircle, description: 'Incident summary with root cause analysis' },
];

const ComplianceReports: React.FC = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [genType, setGenType] = useState('monthly');
  const [genFacility, setGenFacility] = useState('all');
  const [dateFrom, setDateFrom] = useState('2025-07-01');
  const [dateTo, setDateTo] = useState('2025-07-31');
  const [generating, setGenerating] = useState(false);
  const [reports, setReports] = useState(existingReports);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    const newReport = {
      id: `RPT-2025-0${reports.length + 32}`,
      name: `${reportTypes.find(r => r.id === genType)?.label} — ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      type: reportTypes.find(r => r.id === genType)?.label || '',
      facility: genFacility === 'all' ? 'All Facilities' : genFacility,
      score: Math.floor(Math.random() * 15) + 82,
      generated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'ready',
      pages: Math.floor(Math.random() * 20) + 14,
    };
    setReports(prev => [newReport, ...prev]);
    setGenerating(false);
    setShowGenerator(false);
    toast.success('Report generated successfully!');
  };

  const handleDownload = (report: typeof reports[0]) => {
    toast.success(`Downloading ${report.name}...`);
  };

  return (
    <RoleDashboardLayout title="Compliance Reports">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Compliance Reports</h2>
            <p className="text-sm text-muted-foreground">Generate and download fire safety compliance reports</p>
          </div>
          <Button className="gradient-fire text-white border-0 hover:opacity-90 flex-shrink-0" size="sm" onClick={() => setShowGenerator(!showGenerator)}>
            <Plus className="w-4 h-4 mr-2" />Generate New Report
          </Button>
        </div>

        {/* Report Generator */}
        {showGenerator && (
          <div className="bg-card border border-red-200 dark:border-red-800/50 rounded-2xl p-6">
            <h3 className="font-semibold mb-4 text-red-600 dark:text-red-400">New Report Generator</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Report Type</label>
                <select className="input-field" value={genType} onChange={e => setGenType(e.target.value)}>
                  {reportTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Facility</label>
                <select className="input-field" value={genFacility} onChange={e => setGenFacility(e.target.value)}>
                  <option value="all">All Facilities</option>
                  <option value="Main Building">Main Building</option>
                  <option value="Warehouse B">Warehouse B</option>
                  <option value="Data Center">Data Center</option>
                  <option value="Office Block C">Office Block C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Date From</label>
                <input type="date" className="input-field" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Date To</label>
                <input type="date" className="input-field" value={dateTo} onChange={e => setDateTo(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowGenerator(false)}>Cancel</Button>
              <Button className="gradient-fire text-white border-0 hover:opacity-90" size="sm" onClick={handleGenerate} disabled={generating}>
                {generating ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Generating...</>
                ) : 'Generate Report'}
              </Button>
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Reports', value: reports.length, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'This Month', value: 3, color: 'text-green-600 dark:text-green-400' },
            { label: 'Avg Score', value: '88%', color: 'text-purple-600 dark:text-purple-400' },
            { label: 'NBC Compliant', value: '4/5', color: 'text-orange-600 dark:text-orange-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Reports List */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-sm">Generated Reports ({reports.length})</h3>
            <Button size="sm" variant="outline" className="text-xs"><Filter className="w-3 h-3 mr-1" />Filter</Button>
          </div>
          <div className="divide-y divide-border">
            {reports.map(report => (
              <div key={report.id} className="flex items-center gap-4 px-4 py-4 hover:bg-muted/30 transition-colors">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{report.name}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{report.type}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{report.facility}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground"><Calendar className="w-3 h-3 inline mr-0.5" />{report.generated}</span>
                    <span className="text-xs text-muted-foreground">· {report.pages} pages</span>
                  </div>
                </div>
                {report.score && (
                  <div className={`text-sm font-bold px-2 py-0.5 rounded flex-shrink-0 ${report.score >= 90 ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : report.score >= 75 ? 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20'}`}>
                    {report.score}%
                  </div>
                )}
                <Button size="sm" variant="outline" className="flex-shrink-0 text-xs" onClick={() => handleDownload(report)}>
                  <Download className="w-3.5 h-3.5 mr-1" />PDF
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default ComplianceReports;
