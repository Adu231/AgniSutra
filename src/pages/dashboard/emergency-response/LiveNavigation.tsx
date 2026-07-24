import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Navigation, MapPin, DoorOpen, Users, Droplets, ArrowUp } from 'lucide-react';

const floors = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'];

const floorData: Record<string, {
  zones: { id: string; name: string; type: string; x: number; y: number; status?: string }[];
  exits: { id: string; label: string; x: number; y: number }[];
  assembly: { id: string; label: string; x: number; y: number }[];
  hydrants: { id: string; label: string; x: number; y: number }[];
  hazard?: { x: number; y: number; label: string };
}> = {
  'Ground Floor': {
    zones: [
      { id: 'z1', name: 'Reception', type: 'zone', x: 10, y: 10 },
      { id: 'z2', name: 'Canteen', type: 'zone', x: 60, y: 10 },
      { id: 'z3', name: 'Control Room', type: 'zone', x: 10, y: 55 },
      { id: 'z4', name: 'Main Hall', type: 'zone', x: 40, y: 35 },
      { id: 'z5', name: 'Parking Entry', type: 'zone', x: 65, y: 55 },
    ],
    exits: [
      { id: 'e1', label: 'Main Exit', x: 42, y: 85 },
      { id: 'e2', label: 'Side Exit A', x: 5, y: 45 },
      { id: 'e3', label: 'Emergency Exit', x: 85, y: 45 },
    ],
    assembly: [
      { id: 'a1', label: 'Assembly A', x: 30, y: 95 },
      { id: 'a2', label: 'Assembly B', x: 70, y: 95 },
    ],
    hydrants: [
      { id: 'h1', label: 'H-01', x: 15, y: 75 },
      { id: 'h2', label: 'H-02', x: 75, y: 75 },
    ],
    hazard: { x: 62, y: 12, label: 'Smoke Alert' },
  },
};

const LiveNavigation: React.FC = () => {
  const [selectedFloor, setSelectedFloor] = useState('Ground Floor');
  const floor = floorData[selectedFloor] || floorData['Ground Floor'];

  return (
    <RoleDashboardLayout title="Emergency Navigation">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Emergency Navigation</h2>
          <p className="text-sm text-muted-foreground">Building floor plans with emergency routes, equipment, and assembly points</p>
        </div>

        {/* Alert Badge */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400 font-medium">Active Incident: INC-041 — Smoke in Warehouse B Bay 3</p>
        </div>

        {/* Floor Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {floors.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFloor(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${selectedFloor === f ? 'bg-rose-600 text-white' : 'bg-card border border-border text-muted-foreground hover:bg-muted'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Floor Plan */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <h3 className="font-semibold text-sm mb-3">{selectedFloor} — Building Layout</h3>
          <div className="relative w-full aspect-[4/3] bg-muted/30 rounded-xl border-2 border-border overflow-hidden">
            {/* Building outline */}
            <div className="absolute inset-4 border-2 border-muted-foreground/30 rounded-lg" />

            {/* Zones */}
            {floor.zones.map(zone => (
              <div
                key={zone.id}
                className="absolute bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs px-1.5 py-1 font-medium text-blue-700 dark:text-blue-400"
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              >
                {zone.name}
              </div>
            ))}

            {/* Exits */}
            {floor.exits.map(exit => (
              <div
                key={exit.id}
                className="absolute flex flex-col items-center gap-0.5"
                style={{ left: `${exit.x}%`, top: `${exit.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center shadow-md">
                  <DoorOpen className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-1 rounded">{exit.label}</span>
              </div>
            ))}

            {/* Assembly Points */}
            {floor.assembly.map(pt => (
              <div
                key={pt.id}
                className="absolute flex flex-col items-center gap-0.5"
                style={{ left: `${pt.x}%`, top: `${pt.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-1 rounded">{pt.label}</span>
              </div>
            ))}

            {/* Hydrants */}
            {floor.hydrants.map(h => (
              <div
                key={h.id}
                className="absolute flex flex-col items-center gap-0.5"
                style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <Droplets className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs text-blue-700 dark:text-blue-400">{h.label}</span>
              </div>
            ))}

            {/* Hazard indicator */}
            {floor.hazard && (
              <div
                className="absolute flex flex-col items-center gap-0.5 z-10 animate-bounce"
                style={{ left: `${floor.hazard.x}%`, top: `${floor.hazard.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-xl shadow-red-500/50">
                  <span className="text-white text-lg">🔥</span>
                </div>
                <span className="text-xs font-bold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-1 rounded">{floor.hazard.label}</span>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-card border border-border rounded-xl p-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Map Legend</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { color: 'bg-green-500', label: 'Emergency Exits', icon: DoorOpen },
              { color: 'bg-yellow-500', label: 'Assembly Points', icon: Users },
              { color: 'bg-blue-600', label: 'Fire Hydrants', icon: Droplets },
              { color: 'bg-red-500', label: 'Active Hazard', icon: Navigation },
            ].map(l => {
              const Icon = l.icon;
              return (
                <div key={l.label} className="flex items-center gap-2">
                  <div className={`w-5 h-5 ${l.color} rounded flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">{l.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nearest Resources */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-3">Nearest Emergency Resources</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: 'Mumbai Fire Station 7', distance: '1.2 km', time: '4 min' },
              { label: 'Nearest Hospital', distance: '0.8 km', time: '3 min' },
              { label: 'Emergency Assembly A', distance: '50 m', time: '1 min' },
            ].map(r => (
              <div key={r.label} className="bg-muted/40 rounded-xl p-3">
                <p className="text-xs font-semibold">{r.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.distance} · {r.time} away</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default LiveNavigation;
