import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Building, Search, MapPin, ChevronDown, ChevronRight, Phone, AlertTriangle, Users, Layers, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const buildings = [
  { id: 'BLD-001', name: 'Warehouse B — Andheri Industrial', type: 'Industrial', floors: 3, area: '12,400 sqm', occupancy: 'Light Industrial (60 workers)', address: 'Plot 14, Andheri Industrial Zone, Mumbai', lastInspected: 'Jul 15, 2025', fire_safety_rating: 'B', hazmat: ['Chemical Storage Zone B (Solvents)', 'LPG cylinders — Canteen'], hydrants: 4, sprinklers: 'Partial (Floors 1-2)', alarmSystem: 'Conventional (8-Zone)', evacuationRoutes: ['North Gate', 'South Emergency Exit', 'Roof Access Stairs'], contacts: [{ name: 'Facility Manager', phone: '+91 98001 10001' }, { name: 'Security', phone: '+91 98001 10002' }], notes: 'Chemical storage requires HAZMAT team for Zone B incidents' },
  { id: 'BLD-002', name: 'IT Park Tower C — Powai', type: 'Commercial', floors: 12, area: '28,000 sqm', occupancy: 'Commercial Office (800 employees)', address: 'Tower C, Hiranandani Business Park, Powai, Mumbai', lastInspected: 'Jun 20, 2025', fire_safety_rating: 'A', hazmat: ['Server Rooms — CO2 Suppression', 'UPS Battery Banks'], hydrants: 8, sprinklers: 'Full Coverage', alarmSystem: 'Addressable (32-Zone)', evacuationRoutes: ['Main Lobby', 'Service Stairwells (4)', 'Fire Escapes (All Floors)'], contacts: [{ name: 'Building Management', phone: '+91 98001 20001' }, { name: 'Security Control', phone: '+91 98001 20002' }], notes: 'High-rise. Elevator recall to G Floor on alarm. Refuge floors at 4, 8, 12.' },
  { id: 'BLD-003', name: 'Bandra Residential Complex', type: 'Residential', floors: 8, area: '8,200 sqm', occupancy: 'Residential (120 units, ~350 residents)', address: '14 Linking Road, Bandra West, Mumbai', lastInspected: 'May 28, 2025', fire_safety_rating: 'C', hazmat: ['LPG Lines — All Floors', 'Generator Fuel Tank'], hydrants: 3, sprinklers: 'None', alarmSystem: 'Basic (Heat Detectors Only)', evacuationRoutes: ['Main Stairwell', 'Emergency Stairs'], contacts: [{ name: 'Society Secretary', phone: '+91 98001 30001' }], notes: 'No sprinklers. Older building. Stairwells are sole evacuation route.' },
  { id: 'BLD-004', name: 'Apollo Hospital — Marol', type: 'Healthcare', floors: 5, area: '18,500 sqm', occupancy: 'Hospital (300 beds, 800 staff)', address: '18 Marol Maroshi Road, Andheri East, Mumbai', lastInspected: 'Jul 18, 2025', fire_safety_rating: 'A', hazmat: ['Medical Gas Lines', 'Oxygen Storage', 'Pharmacy Chemicals'], hydrants: 10, sprinklers: 'Full Coverage', alarmSystem: 'Addressable + Voice Evacuation', evacuationRoutes: ['Main Entrance', 'ICU Emergency Exit', 'OT Wing Exit', 'Rear Ambulance Bay'], contacts: [{ name: 'Safety Director', phone: '+91 98001 40001' }, { name: 'Security Control', phone: '+91 98001 40002' }], notes: 'Hospital evacuation requires coordination with clinical staff. Non-ambulatory patients require assistance.' },
];

const ratingColor: Record<string, string> = {
  'A': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  'B': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
  'C': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const BuildingDatabase: React.FC = () => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>('BLD-001');

  const filtered = buildings.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.address.toLowerCase().includes(search.toLowerCase()) ||
    b.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RoleDashboardLayout title="Building Database">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Building Database</h2>
            <p className="text-sm text-muted-foreground">Access building information, hazmat data, and emergency contacts</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <span className="text-xs font-medium text-amber-700 dark:text-amber-400">{buildings.length} Buildings Registered</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="input-field pl-10" placeholder="Search by name, address, or type..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {/* Building Cards */}
        <div className="space-y-3">
          {filtered.map(bld => (
            <div key={bld.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <button
                className="w-full px-5 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left"
                onClick={() => setExpanded(expanded === bld.id ? null : bld.id)}
              >
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <p className="font-semibold">{bld.name}</p>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${ratingColor[bld.fire_safety_rating]}`}>Rating: {bld.fire_safety_rating}</span>
                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded">{bld.type}</span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{bld.address}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-muted-foreground hidden sm:block">{bld.floors}F · {bld.occupancy.split('(')[0]}</span>
                  {expanded === bld.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </button>

              {/* Expanded Content */}
              {expanded === bld.id && (
                <div className="px-5 pb-5 border-t border-border">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 mb-4">
                    <div className="bg-muted/40 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1"><Layers className="w-3 h-3" />Floors</p>
                      <p className="font-semibold">{bld.floors}</p>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Area</p>
                      <p className="font-semibold text-sm">{bld.area}</p>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Hydrants</p>
                      <p className="font-semibold">{bld.hydrants}</p>
                    </div>
                    <div className="bg-muted/40 p-3 rounded-xl">
                      <p className="text-xs text-muted-foreground mb-1">Sprinklers</p>
                      <p className="font-semibold text-xs">{bld.sprinklers}</p>
                    </div>
                  </div>

                  {/* Hazmat */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1.5 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Hazmat / Special Hazards</p>
                    <div className="flex flex-wrap gap-1.5">
                      {bld.hazmat.map(h => <span key={h} className="text-xs bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-2 py-1 rounded border border-red-200 dark:border-red-800">{h}</span>)}
                    </div>
                  </div>

                  {/* Evacuation Routes */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-1.5">Evacuation Routes</p>
                    <div className="flex flex-wrap gap-1.5">
                      {bld.evacuationRoutes.map(r => <span key={r} className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded">{r}</span>)}
                    </div>
                  </div>

                  {/* Notes */}
                  {bld.notes && (
                    <div className="mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold mb-1">Operational Notes</p>
                      <p className="text-xs text-amber-600 dark:text-amber-500">{bld.notes}</p>
                    </div>
                  )}

                  {/* Contacts */}
                  <div className="flex gap-2">
                    {bld.contacts.map(c => (
                      <Button key={c.name} size="sm" variant="outline" className="text-xs" onClick={() => toast.success(`Calling ${c.name}: ${c.phone}`)}>
                        <Phone className="w-3 h-3 mr-1" />{c.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default BuildingDatabase;
