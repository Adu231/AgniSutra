import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AlertTriangle, TrendingDown, TrendingUp, MapPin, Zap, Activity } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const facilities = [
  { id: 'F1', name: 'Main Building', score: 42, level: 'high', lastAssessed: '2025-07-20', factors: ['Outdated fire panels', 'Missing suppression zones', 'Elevator shaft risk'] },
  { id: 'F2', name: 'Warehouse Complex', score: 28, level: 'medium', lastAssessed: '2025-07-18', factors: ['Flammable material storage', 'Limited access routes'] },
  { id: 'F3', name: 'Data Center', score: 15, level: 'low', lastAssessed: '2025-07-15', factors: ['Well-maintained suppression', 'Controlled access'] },
  { id: 'F4', name: 'Hospital Wing A', score: 65, level: 'critical', lastAssessed: '2025-07-10', factors: ['High occupancy', 'Oxygen storage', 'Limited evacuation for patients'] },
  { id: 'F5', name: 'Manufacturing Plant', score: 38, level: 'medium', lastAssessed: '2025-07-05', factors: ['Chemical storage', 'Heavy machinery heat risk'] },
];

const riskFactors = [
  { factor: 'Equipment Health', score: 72 }, { factor: 'Inspection Compliance', score: 88 },
  { factor: 'Emergency Preparedness', score: 65 }, { factor: 'Training Status', score: 78 },
  { factor: 'IoT Coverage', score: 55 }, { factor: 'Evacuation Planning', score: 82 },
];

const levelConfig = {
  low: { cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', bar: 'bg-green-500' },
  medium: { cls: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500', bar: 'bg-yellow-500' },
  high: { cls: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400', bar: 'bg-orange-500' },
  critical: { cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', bar: 'bg-red-600' },
};

const RiskAssessment: React.FC = () => {
  return (
    <DashboardLayout title="AI Risk Assessment">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950/50 to-orange-950/30 border border-red-900/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">AI Risk Intelligence Active</h2>
              <p className="text-sm text-white/60">Continuously analyzing equipment data, inspection records, and IoT sensor readings to identify and predict fire risks across all facilities.</p>
            </div>
            <Button className="ml-auto gradient-fire text-white border-0 flex-shrink-0" size="sm" onClick={() => toast.success('Running AI risk analysis...')}>
              Run Analysis
            </Button>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Critical Risk', value: '1', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-500/10' },
            { label: 'High Risk', value: '1', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-500/10' },
            { label: 'Medium Risk', value: '2', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10' },
            { label: 'Low Risk', value: '1', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-500/10' },
          ].map(m => (
            <div key={m.label} className="metric-card">
              <div className={`w-10 h-10 ${m.bg} rounded-lg flex items-center justify-center mb-3`}>
                <AlertTriangle className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className={`text-3xl font-black ${m.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{m.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{m.label} Facilities</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="dashboard-card">
            <h3 className="font-semibold mb-4">Risk Factor Analysis</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={riskFactors}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <Radar name="Score" dataKey="score" stroke="#dc2626" fill="#dc2626" fillOpacity={0.2} strokeWidth={2} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Scores by Facility */}
          <div className="dashboard-card">
            <h3 className="font-semibold mb-4">Risk Scores by Facility</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={facilities} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} width={130} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '11px', color: 'hsl(var(--foreground))' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--muted-foreground))' }} />
                <Bar dataKey="score" fill="#dc2626" radius={[0, 4, 4, 0]} name="Risk Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Facility Risk Cards */}
        <div>
          <h3 className="font-semibold mb-4">Facility Risk Assessment</h3>
          <div className="space-y-4">
            {facilities.sort((a, b) => b.score - a.score).map(fac => {
              const cfg = levelConfig[fac.level as keyof typeof levelConfig];
              return (
                <div key={fac.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold">{fac.name}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold capitalize ${cfg.cls}`}>{fac.level} risk</span>
                        </div>
                        <div className="text-xs text-muted-foreground">Last assessed: {fac.lastAssessed}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-center">
                        <div className={`text-3xl font-black ${fac.score >= 50 ? 'text-red-600' : fac.score >= 30 ? 'text-orange-500' : 'text-green-500'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                          {fac.score}
                        </div>
                        <div className="text-xs text-muted-foreground">Risk Score</div>
                      </div>
                      <div className="w-24 sm:w-32">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${cfg.bar} transition-all`} style={{ width: `${fac.score}%` }} />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">{fac.score}/100</div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {fac.factors.map(f => (
                      <span key={f} className="px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => toast.info('Viewing detailed risk report...')}>View Full Report</Button>
                    <Button size="sm" className="gradient-fire text-white border-0 text-xs" onClick={() => toast.success('AI recommendations generated!')}>AI Recommendations</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RiskAssessment;
