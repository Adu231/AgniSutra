import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { BarChart3, Download, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const incidentTrend = [
  { month: 'Feb', incidents: 8 }, { month: 'Mar', incidents: 6 }, { month: 'Apr', incidents: 5 },
  { month: 'May', incidents: 7 }, { month: 'Jun', incidents: 4 }, { month: 'Jul', incidents: 3 },
];

const inspectionRate = [
  { month: 'Feb', completed: 22, scheduled: 25 }, { month: 'Mar', completed: 28, scheduled: 30 },
  { month: 'Apr', completed: 24, scheduled: 26 }, { month: 'May', completed: 31, scheduled: 32 },
  { month: 'Jun', completed: 29, scheduled: 30 }, { month: 'Jul', completed: 27, scheduled: 28 },
];

const equipmentHealth = [
  { name: 'Operational', value: 342, color: '#22c55e' },
  { name: 'Maintenance', value: 32, color: '#f97316' },
  { name: 'Critical', value: 12, color: '#dc2626' },
  { name: 'Offline', value: 11, color: '#6b7280' },
];

const trainingCompletion = [
  { facility: 'Hospital Main', completion: 94 }, { facility: 'Diagnostics', completion: 88 },
  { facility: 'Childrens Wing', completion: 76 }, { facility: 'Research Block', completion: 65 }, { facility: 'Admin Building', completion: 92 },
];

const incidentDataMap: Record<string, typeof incidentTrend> = {
  '1month': [{ month: 'Jul', incidents: 3 }],
  '3months': [
    { month: 'May', incidents: 7 }, { month: 'Jun', incidents: 4 }, { month: 'Jul', incidents: 3 },
  ],
  '6months': incidentTrend,
  '1year': [
    { month: 'Aug', incidents: 10 }, { month: 'Sep', incidents: 5 }, { month: 'Oct', incidents: 7 },
    { month: 'Nov', incidents: 6 }, { month: 'Dec', incidents: 4 }, { month: 'Jan', incidents: 3 },
    { month: 'Feb', incidents: 8 }, { month: 'Mar', incidents: 6 }, { month: 'Apr', incidents: 5 },
    { month: 'May', incidents: 7 }, { month: 'Jun', incidents: 4 }, { month: 'Jul', incidents: 3 },
  ]
};

const inspectionDataMap: Record<string, typeof inspectionRate> = {
  '1month': [{ month: 'Jul', completed: 27, scheduled: 28 }],
  '3months': [
    { month: 'May', completed: 31, scheduled: 32 },
    { month: 'Jun', completed: 29, scheduled: 30 },
    { month: 'Jul', completed: 27, scheduled: 28 },
  ],
  '6months': inspectionRate,
  '1year': [
    { month: 'Aug', completed: 20, scheduled: 22 }, { month: 'Sep', completed: 25, scheduled: 25 },
    { month: 'Oct', completed: 22, scheduled: 24 }, { month: 'Nov', completed: 29, scheduled: 30 },
    { month: 'Dec', completed: 28, scheduled: 28 }, { month: 'Jan', completed: 26, scheduled: 27 },
    { month: 'Feb', completed: 22, scheduled: 25 }, { month: 'Mar', completed: 28, scheduled: 30 },
    { month: 'Apr', completed: 24, scheduled: 26 }, { month: 'May', completed: 31, scheduled: 32 },
    { month: 'Jun', completed: 29, scheduled: 30 }, { month: 'Jul', completed: 27, scheduled: 28 },
  ]
};

const equipmentHealthDataMap: Record<string, typeof equipmentHealth> = {
  '1month': [
    { name: 'Operational', value: 360, color: '#22c55e' },
    { name: 'Maintenance', value: 20, color: '#f97316' },
    { name: 'Critical', value: 5, color: '#dc2626' },
    { name: 'Offline', value: 12, color: '#6b7280' },
  ],
  '3months': [
    { name: 'Operational', value: 350, color: '#22c55e' },
    { name: 'Maintenance', value: 28, color: '#f97316' },
    { name: 'Critical', value: 9, color: '#dc2626' },
    { name: 'Offline', value: 10, color: '#6b7280' },
  ],
  '6months': equipmentHealth,
  '1year': [
    { name: 'Operational', value: 320, color: '#22c55e' },
    { name: 'Maintenance', value: 45, color: '#f97316' },
    { name: 'Critical', value: 18, color: '#dc2626' },
    { name: 'Offline', value: 14, color: '#6b7280' },
  ]
};

const trainingDataMap: Record<string, typeof trainingCompletion> = {
  '1month': [
    { facility: 'Hospital Main', completion: 96 }, { facility: 'Diagnostics', completion: 90 },
    { facility: 'Childrens Wing', completion: 80 }, { facility: 'Research Block', completion: 70 }, { facility: 'Admin Building', completion: 95 },
  ],
  '3months': [
    { facility: 'Hospital Main', completion: 95 }, { facility: 'Diagnostics', completion: 89 },
    { facility: 'Childrens Wing', completion: 78 }, { facility: 'Research Block', completion: 67 }, { facility: 'Admin Building', completion: 93 },
  ],
  '6months': trainingCompletion,
  '1year': [
    { facility: 'Hospital Main', completion: 90 }, { facility: 'Diagnostics', completion: 82 },
    { facility: 'Childrens Wing', completion: 70 }, { facility: 'Research Block', completion: 60 }, { facility: 'Admin Building', completion: 88 },
  ]
};

const FacilityAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('6months');

  const incidentData = incidentDataMap[dateRange] || incidentTrend;
  const inspectionData = inspectionDataMap[dateRange] || inspectionRate;
  const equipmentHealthData = equipmentHealthDataMap[dateRange] || equipmentHealth;
  const trainingData = trainingDataMap[dateRange] || trainingCompletion;

  const totalEquipmentCount = equipmentHealthData.reduce((sum, e) => sum + e.value, 0);

  const handleExport = () => {
    toast.success('Exporting executive analytics report...');
    const content = `AGNISUTRA EXECUTIVE ANALYTICS REPORT
=========================================
Report Range: ${dateRange === '1month' ? 'Last Month' : dateRange === '3months' ? 'Last 3 Months' : dateRange === '6months' ? 'Last 6 Months' : 'Last Year'}
Exported On: ${new Date().toLocaleString()}

SUMMARY STATISTICS:
- Average Compliance: 91%
- Inspection Success Rate: 96%
- Average Training Score: 83%

INCIDENT TRENDS:
${incidentData.map(d => `${d.month}: ${d.incidents} incidents`).join('\n')}

INSPECTION SUCCESS:
${inspectionData.map(d => `${d.month}: Completed ${d.completed} of ${d.scheduled} scheduled`).join('\n')}

EQUIPMENT HEALTH OVERVIEW:
${equipmentHealthData.map(d => `${d.name}: ${d.value} items`).join('\n')}

TRAINING COMPLETION BY FACILITY:
${trainingData.map(d => `${d.facility}: ${d.completion}% completion`).join('\n')}

Authorized Signature:
AgniSutra Analytics Division
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Executive_Analytics_${dateRange}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <RoleDashboardLayout title="Analytics & Reports">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Analytics & Reports</h2>
            <p className="text-sm text-muted-foreground">Operational insights across all managed facilities</p>
          </div>
          <div className="flex gap-2">
            <select className="input-field w-auto text-sm" value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
            <Button size="sm" variant="outline" className="text-xs font-semibold hover:opacity-90" onClick={handleExport}>
              <Download className="w-3.5 h-3.5 mr-1" />Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Avg Compliance', value: '91%', change: '+4%', up: true, color: 'text-green-600 dark:text-green-400' },
            { label: 'Incidents (Jul)', value: '3', change: '-25% vs Jun', up: true, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Inspection Rate', value: '96%', change: '+2%', up: true, color: 'text-purple-600 dark:text-purple-400' },
            { label: 'Training Score', value: '83%', change: '-7% vs Jun', up: false, color: 'text-orange-600 dark:text-orange-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              <div className={`text-xs mt-1 flex items-center gap-0.5 ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Incident Trend */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Incident Trend</h3>
            <p className="text-xs text-muted-foreground mb-4 font-medium">Monthly incident count ({dateRange === '1month' ? 'Last Month' : dateRange === '3months' ? 'Last 3 Months' : dateRange === '6months' ? 'Feb–Jul 2025' : 'Last Year'})</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={incidentData}>
                <defs>
                  <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                />
                <Area type="monotone" dataKey="incidents" stroke="#7c3aed" strokeWidth={2.5} fill="url(#incGrad)" name="Incidents" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Inspection Success Rate */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Inspection Success Rate</h3>
            <p className="text-xs text-muted-foreground mb-4 font-medium">Completed vs Scheduled ({dateRange === '1month' ? 'Last Month' : dateRange === '3months' ? 'Last 3 Months' : dateRange === '6months' ? 'Feb–Jul 2025' : 'Last Year'})</p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={inspectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                />
                <Bar dataKey="scheduled" fill="hsl(var(--muted))" radius={[3, 3, 0, 0]} name="Scheduled" />
                <Bar dataKey="completed" fill="#7c3aed" radius={[3, 3, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Equipment Health */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Equipment Health Overview</h3>
            <p className="text-xs text-muted-foreground mb-3 font-medium">{totalEquipmentCount} total equipment items</p>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={equipmentHealthData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                    {equipmentHealthData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 flex-1">
                {equipmentHealthData.map(e => (
                  <div key={e.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-muted-foreground">{e.name}</span></div>
                    <span className="font-semibold">{e.value} ({Math.round(e.value / totalEquipmentCount * 100)}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training Completion */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Training Completion by Facility</h3>
            <p className="text-xs text-muted-foreground mb-3 font-medium">Employee training compliance rate</p>
            <div className="space-y-3">
              {trainingData.map(t => (
                <div key={t.facility}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-medium">{t.facility}</span>
                    <span className="font-semibold">{t.completion}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-2 rounded-full ${t.completion >= 90 ? 'bg-green-500' : t.completion >= 75 ? 'bg-purple-500' : 'bg-orange-500'}`} style={{ width: `${t.completion}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default FacilityAnalytics;
