import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Wifi, WifiOff, AlertTriangle, Thermometer, Droplets, Wind, Zap, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const generateReadings = () => Array.from({ length: 12 }, (_, i) => ({
  time: `${i * 5}m`,
  temp: 22 + Math.random() * 5,
  smoke: Math.random() * 30,
  co2: 400 + Math.random() * 100,
}));

const devices = [
  { id: 'D001', name: 'Smoke Sensor – Lobby', type: 'smoke', location: 'Ground Floor Lobby', status: 'online', value: 12, unit: 'ppm', battery: 87, signal: 92, lastReading: '2s ago' },
  { id: 'D002', name: 'Heat Detector – B2', type: 'temperature', location: 'B2 Floor Zone A', status: 'alert', value: 68, unit: '°C', battery: 65, signal: 78, lastReading: '5s ago' },
  { id: 'D003', name: 'CO2 Monitor – Server', type: 'gas', location: 'Server Room', status: 'online', value: 445, unit: 'ppm', battery: 92, signal: 95, lastReading: '3s ago' },
  { id: 'D004', name: 'Water Tank Level', type: 'water', location: 'Rooftop Tank', status: 'online', value: 78, unit: '%', battery: null, signal: 88, lastReading: '10s ago' },
  { id: 'D005', name: 'Smoke Sensor – Kitchen', type: 'smoke', location: 'Cafeteria Kitchen', status: 'offline', value: 0, unit: 'ppm', battery: 12, signal: 0, lastReading: '45m ago' },
  { id: 'D006', name: 'Pump Status Monitor', type: 'pump', location: 'Basement Pump Room', status: 'online', value: 6.2, unit: 'bar', battery: null, signal: 90, lastReading: '1s ago' },
  { id: 'D007', name: 'Gas Leak Detector – LPG', type: 'gas', location: 'Canteen Gas Bank', status: 'online', value: 0.2, unit: '% LEL', battery: 78, signal: 85, lastReading: '4s ago' },
  { id: 'D008', name: 'Heat Detector – Boiler', type: 'temperature', location: 'Boiler Room B1', status: 'online', value: 45, unit: '°C', battery: 60, signal: 70, lastReading: '8s ago' },
];

const statusConfig = {
  online: { cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', dot: 'bg-green-500', icon: Wifi },
  offline: { cls: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400', dot: 'bg-gray-400', icon: WifiOff },
  alert: { cls: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400', dot: 'bg-red-500', icon: AlertTriangle },
};

const typeIcons = { smoke: Wind, temperature: Thermometer, gas: Activity, water: Droplets, pump: Zap };

const IoTMonitoring: React.FC = () => {
  const [readings, setReadings] = useState(generateReadings());

  useEffect(() => {
    const interval = setInterval(() => {
      setReadings(prev => {
        const newPoint = { time: 'Now', temp: 22 + Math.random() * 5, smoke: Math.random() * 30, co2: 400 + Math.random() * 100 };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout title="IoT Monitoring">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Devices', value: devices.length, color: 'text-foreground' },
            { label: 'Online', value: devices.filter(d => d.status === 'online').length, color: 'text-green-500' },
            { label: 'Alert', value: devices.filter(d => d.status === 'alert').length, color: 'text-red-500' },
            { label: 'Offline', value: devices.filter(d => d.status === 'offline').length, color: 'text-gray-500' },
          ].map(s => (
            <div key={s.label} className="metric-card">
              <div className={`text-3xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Alert Banner */}
        {devices.some(d => d.status === 'alert') && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3">
            <div className="relative"><div className="w-3 h-3 bg-red-500 rounded-full" /><div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" /></div>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">Active Alert: Heat Detector on B2 Floor reading 68°C — above threshold (55°C)</p>
            <button onClick={() => toast.success('Alert acknowledged!')} className="ml-auto text-xs text-red-600 dark:text-red-400 hover:underline whitespace-nowrap">Acknowledge</button>
          </div>
        )}

        {/* Live Chart */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Live Sensor Readings</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="relative inline-block"><div className="w-2 h-2 bg-green-500 rounded-full inline-block" /><div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" /></div>
                {' '}Real-time data feed · Auto-refreshing every 3s
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={readings}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
              <Line type="monotone" dataKey="temp" stroke="#dc2626" strokeWidth={2} dot={false} name="Temp (°C)" />
              <Line type="monotone" dataKey="smoke" stroke="#f97316" strokeWidth={2} dot={false} name="Smoke (ppm)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Devices Grid */}
        <div>
          <h3 className="font-semibold mb-4">Connected Devices</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {devices.map(device => {
              const sc = statusConfig[device.status as keyof typeof statusConfig];
              const TypeIcon = typeIcons[device.type as keyof typeof typeIcons] || Activity;
              const StatusIcon = sc.icon;
              return (
                <div
                  key={device.id}
                  className={`bg-card border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer ${device.status === 'alert' ? 'border-red-300 dark:border-red-700' : 'border-border'}`}
                  onClick={() => device.status === 'alert' && toast.error(`Alert: ${device.name} reading is above threshold!`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${sc.cls}`}>
                      <StatusIcon className="w-3 h-3" />{device.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1 leading-tight">{device.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{device.location}</p>
                  <div className={`text-2xl font-black mb-1 ${device.status === 'alert' ? 'text-red-500' : 'text-foreground'}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    {device.status === 'offline' ? 'N/A' : `${device.value} ${device.unit}`}
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Signal: {device.signal}%</span>
                    {device.battery !== null && <span>Battery: {device.battery}%</span>}
                    <span>{device.lastReading}</span>
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

export default IoTMonitoring;
