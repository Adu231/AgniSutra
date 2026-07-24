import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Search, FileSearch, Download, AlertTriangle, User, Clock, Shield, Key, Building2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const auditLogs = [
  { id: 'LOG-8821', action: 'USER_LOGIN', user: 'officer@agnisutra.demo', org: 'DLF Commercial Properties', ip: '103.21.54.12', timestamp: 'Jul 28 · 15:32:14', severity: 'info', details: 'Successful login from Mumbai, Maharashtra' },
  { id: 'LOG-8820', action: 'REPORT_GENERATED', user: 'officer@agnisutra.demo', org: 'DLF Commercial Properties', ip: '103.21.54.12', timestamp: 'Jul 28 · 15:28:02', severity: 'info', details: 'Monthly Compliance Report generated for July 2025' },
  { id: 'LOG-8819', action: 'USER_ROLE_CHANGED', user: 'admin@agnisutra.demo', org: 'AgniSutra Technologies', ip: '43.230.88.1', timestamp: 'Jul 28 · 14:55:20', severity: 'warning', details: 'Role changed: old_user@org.com — viewer → fire_inspector' },
  { id: 'LOG-8818', action: 'INCIDENT_CREATED', user: 'emergency@agnisutra.demo', org: 'Tata Steel Manufacturing', ip: '202.65.43.88', timestamp: 'Jul 28 · 14:22:44', severity: 'critical', details: 'Critical incident INC-041 created — Smoke Detector Triggered' },
  { id: 'LOG-8817', action: 'EQUIPMENT_STATUS_UPDATE', user: 'technician@agnisutra.demo', org: 'DLF Commercial Properties', ip: '103.21.54.55', timestamp: 'Jul 28 · 13:45:30', severity: 'info', details: 'Equipment EQ-014 status: offline → operational' },
  { id: 'LOG-8816', action: 'FAILED_LOGIN_ATTEMPT', user: 'unknown@spam.com', org: 'N/A', ip: '185.220.101.14', timestamp: 'Jul 28 · 12:30:11', severity: 'security', details: '3rd consecutive failed login attempt from external IP' },
  { id: 'LOG-8815', action: 'ORG_PLAN_UPGRADED', user: 'admin@agnisutra.demo', org: 'AgniSutra Technologies', ip: '43.230.88.1', timestamp: 'Jul 28 · 11:00:05', severity: 'info', details: 'Organization GMR Airports upgraded: professional → enterprise' },
  { id: 'LOG-8814', action: 'API_KEY_CREATED', user: 'manager@agnisutra.demo', org: 'Apollo Hospitals Group', ip: '122.166.77.21', timestamp: 'Jul 28 · 10:15:42', severity: 'warning', details: 'New API key created for IoT integration' },
  { id: 'LOG-8813', action: 'DATA_EXPORT', user: 'inspector@agnisutra.demo', org: 'Maharashtra Fire Services', ip: '103.55.42.8', timestamp: 'Jul 28 · 09:32:17', severity: 'info', details: 'Bulk export of inspection records — 847 records downloaded' },
  { id: 'LOG-8812', action: 'USER_SUSPENDED', user: 'admin@agnisutra.demo', org: 'AgniSutra Technologies', ip: '43.230.88.1', timestamp: 'Jul 27 · 18:20:00', severity: 'warning', details: 'User old@example.com suspended by admin' },
];

const severityConfig: Record<string, { badge: string; icon: React.ComponentType<{ className?: string }> }> = {
  info: { badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400', icon: User },
  warning: { badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400', icon: AlertTriangle },
  critical: { badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', icon: AlertTriangle },
  security: { badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400', icon: Shield },
};

const AuditLogs: React.FC = () => {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const filtered = auditLogs.filter(log => {
    const matchSearch = log.action.toLowerCase().includes(search.toLowerCase()) || log.user.toLowerCase().includes(search.toLowerCase()) || log.details.toLowerCase().includes(search.toLowerCase());
    const matchSeverity = severityFilter === 'all' || log.severity === severityFilter;
    return matchSearch && matchSeverity;
  });

  const handleExportLogs = () => {
    if (filtered.length === 0) {
      toast.error('No logs to export.');
      return;
    }
    const headers = 'ID,Action,User,Organization,IP,Timestamp,Severity,Details\n';
    const rows = filtered.map(log => 
      `"${log.id}","${log.action}","${log.user}","${log.org}","${log.ip}","${log.timestamp}","${log.severity}","${log.details.replace(/"/g, '""')}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Audit_Logs_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Audit logs exported to CSV successfully!');
  };

  return (
    <RoleDashboardLayout title="Audit Logs">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Audit Logs</h2>
            <p className="text-sm text-muted-foreground">Complete activity trail for compliance and security monitoring</p>
          </div>
          <Button size="sm" variant="outline" className="text-xs flex-shrink-0 font-semibold hover:opacity-90" onClick={handleExportLogs}>
            <Download className="w-3.5 h-3.5 mr-1" />Export Logs
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Events (24h)', value: auditLogs.length, color: 'text-slate-700 dark:text-slate-300', key: 'all' },
            { label: 'Security Alerts', value: auditLogs.filter(l => l.severity === 'security').length, color: 'text-red-600 dark:text-red-400', key: 'security' },
            { label: 'Warnings', value: auditLogs.filter(l => l.severity === 'warning').length, color: 'text-yellow-600 dark:text-yellow-400', key: 'warning' },
            { label: 'Critical Events', value: auditLogs.filter(l => l.severity === 'critical').length, color: 'text-orange-600 dark:text-orange-400', key: 'critical' },
          ].map(s => (
            <button key={s.key} onClick={() => setSeverityFilter(severityFilter === s.key ? 'all' : s.key)} className={`p-4 rounded-xl border border-border bg-card text-left transition-all hover:bg-muted/30 ${severityFilter === s.key ? 'ring-2 ring-slate-500' : ''}`}>
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="input-field pl-10" placeholder="Search by action, user, or details..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field w-auto" value={severityFilter} onChange={e => setSeverityFilter(e.target.value)}>
            <option value="all">All Severity</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
            <option value="security">Security</option>
          </select>
        </div>

        {/* Logs Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border text-xs text-muted-foreground">
            Showing {filtered.length} of {auditLogs.length} events
          </div>
          <div className="divide-y divide-border">
            {filtered.map(log => {
              const cfg = severityConfig[log.severity];
              const Icon = cfg.icon;
              return (
                <div key={log.id} className="px-4 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${cfg.badge}`}>
                      {log.severity}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold font-mono text-xs">{log.action}</p>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{log.user}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{log.org}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{log.details}</p>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{log.timestamp}</span>
                        <span>IP: {log.ip}</span>
                        <span className="font-mono text-xs opacity-60">{log.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default AuditLogs;
