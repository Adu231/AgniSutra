import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { toast } from 'sonner';

const complianceMonthly = [
  { month: 'Jan', score: 72, target: 85 }, { month: 'Feb', score: 76, target: 85 }, { month: 'Mar', score: 80, target: 85 },
  { month: 'Apr', score: 78, target: 85 }, { month: 'May', score: 85, target: 85 }, { month: 'Jun', score: 88, target: 85 },
  { month: 'Jul', score: 94, target: 85 },
];

const inspectionsByType = [
  { type: 'Routine', count: 42 }, { type: 'Audit', count: 18 }, { type: 'Compliance', count: 25 },
  { type: 'Maintenance', count: 31 }, { type: 'Emergency', count: 8 },
];

const incidentsByMonth = [
  { month: 'Jan', high: 3, medium: 7, low: 12 }, { month: 'Feb', high: 2, medium: 5, low: 9 },
  { month: 'Mar', high: 4, medium: 8, low: 11 }, { month: 'Apr', high: 1, medium: 4, low: 8 },
  { month: 'May', high: 2, medium: 6, low: 7 }, { month: 'Jun', high: 1, medium: 3, low: 6 },
  { month: 'Jul', high: 2, medium: 3, low: 4 },
];

const equipmentPie = [
  { name: 'Extinguishers', value: 45, color: '#dc2626' },
  { name: 'Smoke Detectors', value: 38, color: '#f97316' },
  { name: 'Hydrants', value: 22, color: '#facc15' },
  { name: 'Sprinklers', value: 31, color: '#22c55e' },
  { name: 'Others', value: 32, color: '#6b7280' },
];

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');

  const topMetrics = [
    { label: 'Overall Compliance', value: '94%', change: '+22%', up: true },
    { label: 'Incidents Resolved', value: '47', change: '-15% vs last month', up: true },
    { label: 'Avg Inspection Score', value: '89.2%', change: '+4.1%', up: true },
    { label: 'Equipment Uptime', value: '96.8%', change: '+2.3%', up: true },
  ];

  return (
    <DashboardLayout title="Analytics & Reports">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            {['7d', '30d', '90d', '1y'].map(range => (
              <button key={range} onClick={() => setDateRange(range)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${dateRange === range ? 'gradient-fire text-white' : 'bg-card border border-border hover:bg-muted'}`}>{range}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => toast.success('Report exported as PDF!')}><Download className="w-4 h-4 mr-2" />Export PDF</Button>
            <Button variant="outline" size="sm" onClick={() => toast.success('Scheduled report set up!')}><Calendar className="w-4 h-4 mr-2" />Schedule</Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topMetrics.map(m => (
            <div key={m.label} className="metric-card">
              <div className="text-2xl font-black gradient-fire-text" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{m.value}</div>
              <div className="text-xs text-muted-foreground mt-1 mb-2">{m.label}</div>
              <div className={`text-xs flex items-center gap-1 ${m.up ? 'text-green-500' : 'text-red-500'}`}>
                {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{m.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance Trend */}
          <div className="dashboard-card">
            <h3 className="font-semibold mb-1">Compliance Score Trend</h3>
            <p className="text-xs text-muted-foreground mb-4">Monthly compliance vs 85% target</p>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={complianceMonthly}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2.5} fill="url(#aGrad)" name="Compliance %" />
                <Line type="monotone" dataKey="target" stroke="#f97316" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Incident Analysis */}
          <div className="dashboard-card">
            <h3 className="font-semibold mb-1">Incident Analysis by Severity</h3>
            <p className="text-xs text-muted-foreground mb-4">Monthly breakdown by severity level</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={incidentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="high" fill="#dc2626" stackId="a" name="High" radius={[0, 0, 0, 0]} />
                <Bar dataKey="medium" fill="#f97316" stackId="a" name="Medium" />
                <Bar dataKey="low" fill="#facc15" stackId="a" name="Low" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inspections by Type */}
          <div className="dashboard-card">
            <h3 className="font-semibold mb-4">Inspections by Type</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={inspectionsByType}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="type" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#dc2626" radius={[4, 4, 0, 0]} name="Inspections" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Equipment Distribution */}
          <div className="dashboard-card">
            <h3 className="font-semibold mb-4">Equipment Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={equipmentPie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                    {equipmentPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {equipmentPie.map(e => (
                <div key={e.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: e.color }} />
                  <span className="text-muted-foreground">{e.name}: <span className="font-semibold text-foreground">{e.value}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
