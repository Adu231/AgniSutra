import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Shield, AlertTriangle, CheckCircle, Clock, Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const facilities = [
  { name: 'Apollo Hospital Main', score: 96, nbc: 'compliant', nfpa: 'compliant', tac: 'compliant', lastAudit: 'Jul 20, 2025', nextAudit: 'Oct 20, 2025', openIssues: 1, criticalDeadlines: [] },
  { name: 'Apollo Diagnostics Center', score: 88, nbc: 'compliant', nfpa: 'minor', tac: 'compliant', lastAudit: 'Jul 12, 2025', nextAudit: 'Oct 12, 2025', openIssues: 3, criticalDeadlines: ['Exit light replacement by Aug 5'] },
  { name: 'Apollo Childrens Wing', score: 82, nbc: 'minor', nfpa: 'compliant', tac: 'minor', lastAudit: 'Jun 28, 2025', nextAudit: 'Sep 28, 2025', openIssues: 5, criticalDeadlines: ['Sprinkler service overdue', 'NBC renewal Aug 15'] },
  { name: 'Apollo Research Block', score: 71, nbc: 'non_compliant', nfpa: 'minor', tac: 'compliant', lastAudit: 'Jun 15, 2025', nextAudit: 'Sep 15, 2025', openIssues: 8, criticalDeadlines: ['Emergency panel inspection Jul 31 OVERDUE', 'NBC compliance plan required'] },
  { name: 'Apollo Admin Building', score: 91, nbc: 'compliant', nfpa: 'compliant', tac: 'compliant', lastAudit: 'Jul 18, 2025', nextAudit: 'Oct 18, 2025', openIssues: 2, criticalDeadlines: [] },
];

const standardBadge: Record<string, string> = {
  compliant: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  minor: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  non_compliant: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const upcomingDeadlines = [
  { facility: 'Apollo Childrens Wing', event: 'NBC Annual Renewal', due: 'Aug 15, 2025', daysLeft: 19, urgent: true },
  { facility: 'Apollo Diagnostics Center', event: 'Exit Light Replacement', due: 'Aug 05, 2025', daysLeft: 9, urgent: true },
  { facility: 'Apollo Hospital Main', event: 'Quarterly Inspection', due: 'Oct 20, 2025', daysLeft: 88, urgent: false },
  { facility: 'Apollo Admin Building', event: 'Equipment Audit', due: 'Oct 18, 2025', daysLeft: 86, urgent: false },
];

const ComplianceMonitor: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleDownloadReport = (facility: typeof facilities[0]) => {
    toast.success(`Downloading compliance report for ${facility.name}...`);
    const content = `AGNISUTRA COMPLIANCE MONITOR REPORT
=========================================
Facility Name: ${facility.name}
Compliance Score: ${facility.score}%
Last Audit Date: ${facility.lastAudit}
Next Audit Date: ${facility.nextAudit}
Total Open Issues: ${facility.openIssues}

Standard Statuses:
------------------
National Building Code (NBC): ${facility.nbc.toUpperCase()}
National Fire Protection Association (NFPA): ${facility.nfpa.toUpperCase()}
Tariff Advisory Committee (TAC): ${facility.tac.toUpperCase()}

Critical Deadlines / Open Actions:
----------------------------------
${facility.criticalDeadlines.length > 0 ? facility.criticalDeadlines.map(d => `- ${d}`).join('\n') : 'No critical deadlines pending.'}

Authorized Signature:
AgniSutra Compliance Command Center
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${facility.name.replace(/\s+/g, '_')}_Compliance_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <RoleDashboardLayout title="Compliance Monitor">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Compliance Monitor</h2>
          <p className="text-sm text-muted-foreground">Track compliance status across all facilities and regulatory standards</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Fully Compliant', value: facilities.filter(f => f.score >= 90).length, color: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
            { label: 'Minor Issues', value: facilities.filter(f => f.score >= 75 && f.score < 90).length, color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' },
            { label: 'Action Needed', value: facilities.filter(f => f.score < 75).length, color: 'text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
            { label: 'Upcoming Deadlines', value: upcomingDeadlines.length, color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
          ].map(s => (
            <div key={s.label} className={`p-4 rounded-xl border ${s.color}`}>
              <div className="text-2xl font-black" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Facility Compliance Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm">Facility Compliance Status</h3>
          </div>
          <div className="divide-y divide-border">
            {facilities.map(f => (
              <div key={f.name}>
                <div
                  className="px-4 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === f.name ? null : f.name)}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold">{f.name}</p>
                        {f.openIssues > 0 && (
                          <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded">
                            {f.openIssues} issues
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {['NBC', 'NFPA', 'TAC'].map((std, i) => {
                          const statuses = [f.nbc, f.nfpa, f.tac];
                          return <span key={std} className={`text-xs px-1.5 py-0.5 rounded ${standardBadge[statuses[i]]}`}>{std}</span>;
                        })}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-lg font-black ${f.score >= 90 ? 'text-green-600' : f.score >= 75 ? 'text-orange-600' : 'text-red-600'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{f.score}%</div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === f.name ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </div>
                {expanded === f.name && (
                  <div className="px-4 pb-4 bg-muted/20">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      <div><p className="text-xs text-muted-foreground">Last Audit</p><p className="text-sm font-medium">{f.lastAudit}</p></div>
                      <div><p className="text-xs text-muted-foreground">Next Audit</p><p className="text-sm font-medium">{f.nextAudit}</p></div>
                      <div><p className="text-xs text-muted-foreground">Open Issues</p><p className="text-sm font-medium">{f.openIssues}</p></div>
                    </div>
                    {f.criticalDeadlines.length > 0 && (
                      <div className="space-y-1">
                        {f.criticalDeadlines.map(d => (
                          <div key={d} className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                            <AlertTriangle className="w-3 h-3 flex-shrink-0" />{d}
                          </div>
                        ))}
                      </div>
                    )}
                     <Button size="sm" className="mt-3 text-xs gradient-fire text-white border-0 hover:opacity-90 flex items-center" onClick={() => handleDownloadReport(f)}>
                       Download Report
                     </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-500" />Upcoming Compliance Deadlines</h3>
          </div>
          <div className="divide-y divide-border">
            {upcomingDeadlines.map(d => (
              <div key={d.event} className="px-4 py-3 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0 ${d.urgent ? 'bg-red-600' : 'bg-purple-600'}`}>
                  <span className="text-xs font-bold">{d.daysLeft}</span>
                  <span className="text-xs opacity-80">days</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{d.event}</p>
                  <p className="text-xs text-muted-foreground">{d.facility} · Due {d.due}</p>
                </div>
                {d.urgent && <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default ComplianceMonitor;
