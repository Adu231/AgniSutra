import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { 
  MapPin, Navigation, CheckCircle2, ChevronRight, AlertTriangle, 
  RefreshCw, Flame, Users, Droplets, Map, Play, ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const STEPS = [
  { title: 'Locate Incident Target', desc: 'Identify target zone coordinates: Warehouse B, Ground Floor, Bay 3.' },
  { title: 'Access Building Entry A', desc: 'Proceed through security gates, verify authorization, and secure safety equipment.' },
  { title: 'Follow Core Evacuation Path', desc: 'Move through main corridors toward the southern warehouse wing.' },
  { title: 'Access Equipment Station H-01', desc: 'Retrieve emergency breathing apparatus and Class A extinguisher near the zone door.' },
  { title: 'Arrive at Hazard Perimeter', desc: 'Begin standard containment operations and establish responder communications.' }
];

const LiveNavigation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [detourActive, setDetourActive] = useState(false);

  const handleNextStep = () => {
    if (activeStep < STEPS.length - 1) {
      setActiveStep(prev => prev + 1);
      toast.success(`Step ${activeStep + 1} completed! Proceeding...`);
    } else {
      toast.success('Incident target perimeter reached!');
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setDetourActive(false);
    toast.info('Navigation route reset.');
  };

  const toggleDetour = () => {
    setDetourActive(prev => {
      const next = !prev;
      if (next) {
        toast.warning('Detour activated! recalculating optimal route...', {
          description: 'Main Corridor blocked. Re-routing via East Side Corridor.'
        });
      } else {
        toast.info('Detour cleared. Reverted to standard path.');
      }
      return next;
    });
  };

  // Dynamic values based on detour
  const distance = detourActive ? '195 meters' : '120 meters';
  const eta = detourActive ? '2 min 40 sec' : '1 min 15 sec';
  const routeStatus = detourActive ? 'Detoured (East Wing)' : 'Direct Path (Optimal)';

  return (
    <RoleDashboardLayout title="Navigate to Location">
      <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Navigate to Location</h2>
            <p className="text-sm text-muted-foreground">Real-time step-by-step route directions to the active hazard area</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="h-9 gap-1.5">
              <RefreshCw className="w-4 h-4" /> Reset Route
            </Button>
            <Button 
              variant={detourActive ? "destructive" : "outline"} 
              size="sm" 
              onClick={toggleDetour}
              className="h-9 gap-1.5 font-medium"
            >
              <AlertTriangle className="w-4 h-4" />
              {detourActive ? "Clear Route Obstruction" : "Report Path Blocked"}
            </Button>
          </div>
        </div>

        {/* Alert Status Card */}
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/10 dark:bg-red-500/20 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wide">Target Incident</p>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">INC-041 · Smoke Alert in Warehouse B Bay 3</h4>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 w-full md:w-auto text-left border-t border-red-200 dark:border-red-900/50 md:border-t-0 pt-3 md:pt-0">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Distance</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{distance}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">ETA</p>
              <p className="text-sm font-bold text-red-600 dark:text-red-400">{eta}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Status</p>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{routeStatus}</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Easy to Read Step List */}
          <div className="lg:col-span-5 bg-card border border-border rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Route Directions</h3>
            
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-muted">
              {STEPS.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;
                const isPending = index > activeStep;

                return (
                  <div key={index} className="flex gap-4 relative">
                    {/* Circle Node */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 z-10 transition-colors ${
                      isCompleted 
                        ? 'bg-rose-600 border-rose-600 text-white' 
                        : isActive 
                        ? 'bg-background border-rose-600 text-rose-600 dark:text-rose-400 animate-pulse' 
                        : 'bg-background border-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4 text-white" /> : index + 1}
                    </div>

                    {/* Step Content */}
                    <div className="space-y-0.5 pt-1">
                      <p className={`text-xs font-bold transition-colors ${
                        isCompleted 
                          ? 'text-muted-foreground line-through' 
                          : isActive 
                          ? 'text-slate-900 dark:text-white' 
                          : 'text-muted-foreground/60'
                      }`}>
                        {step.title}
                      </p>
                      <p className={`text-xs leading-relaxed transition-colors ${
                        isActive ? 'text-muted-foreground font-medium' : 'text-muted-foreground/40'
                      }`}>
                        {isActive && detourActive && index === 2 
                          ? "DETOUR PATH ACTIVE: Avoid the Main Corridor. Turn left at Lobby and route through Side Corridor C instead." 
                          : step.desc
                        }
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-border">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold gap-1.5 h-10"
              >
                {activeStep === STEPS.length - 1 ? "Arrived at Incident" : "Mark Step Complete"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Column: Clean Vector Interactive Map */}
          <div className="lg:col-span-7 bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Active Floor Plan Routing</h3>
              <span className="text-[10px] bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Ground Floor Wing B
              </span>
            </div>

            {/* Simulated Vector Floor Plan Map */}
            <div className="relative aspect-[4/3] bg-muted/20 dark:bg-muted/5 border-2 border-border rounded-xl flex items-center justify-center p-6 overflow-hidden">
              
              {/* Map SVG */}
              <svg className="w-full h-full text-slate-300 dark:text-slate-800" viewBox="0 0 500 375" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Rooms Borders */}
                <rect x="20" y="20" width="140" height="120" rx="8" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                <text x="35" y="45" fill="currentColor" className="text-[10px] font-bold">LOBBY (Entry)</text>

                <rect x="180" y="20" width="300" height="120" rx="8" stroke="currentColor" strokeWidth="2" />
                <text x="195" y="45" fill="currentColor" className="text-[10px] font-bold">MAIN HALL</text>

                <rect x="20" y="160" width="140" height="190" rx="8" stroke="currentColor" strokeWidth="2" />
                <text x="35" y="185" fill="currentColor" className="text-[10px] font-bold">SIDE CORRIDOR C</text>

                <rect x="180" y="160" width="300" height="190" rx="8" stroke="currentColor" strokeWidth="2" />
                <text x="195" y="185" fill="currentColor" className="text-[10px] font-bold">WAREHOUSE B</text>

                {/* Legend items / Doors */}
                <line x1="160" y1="60" x2="180" y2="60" stroke="#10b981" strokeWidth="4" /> {/* Door A */}
                <line x1="90" y1="140" x2="90" y2="160" stroke="#10b981" strokeWidth="4" /> {/* Door C */}
                <line x1="180" y1="230" x2="200" y2="230" stroke="#10b981" strokeWidth="4" /> {/* Door B */}

                {/* Obstruction block */}
                {detourActive && (
                  <g className="animate-pulse">
                    <rect x="220" y="55" width="220" height="50" rx="4" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2" />
                    <text x="260" y="85" fill="#ef4444" className="text-xs font-black">CORRIDOR BLOCKED</text>
                  </g>
                )}

                {/* Routing Line (Dotted Path) */}
                {detourActive ? (
                  // detoured path: Lobby -> Side Corridor -> Warehouse
                  <path 
                    d="M 90 80 L 90 250 L 330 250" 
                    fill="none" 
                    stroke="#f43f5e" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeDasharray="6 6" 
                    className="animate-[dash_2s_linear_infinite]"
                  />
                ) : (
                  // direct path: Lobby -> Main Hall -> Warehouse
                  <path 
                    d="M 90 80 L 330 80 L 330 250" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeDasharray="6 6" 
                    className="animate-[dash_2s_linear_infinite]"
                  />
                )}

                {/* Path Animation Keyframe (Inline Style block) */}
                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                `}</style>
              </svg>

              {/* Start Responder Node Indicator */}
              <div className="absolute top-[21%] left-[18%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20">
                <div className="w-9 h-9 bg-rose-600 dark:bg-rose-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg shadow-rose-500/30">
                  <Navigation className="w-4 h-4 rotate-45 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-300 bg-background/80 px-1.5 py-0.5 rounded border border-border shadow-sm">
                  Responder
                </span>
              </div>

              {/* End Hazard Target Node Indicator */}
              <div className="absolute top-[67%] left-[66%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-xl shadow-red-500/50 animate-bounce">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-black text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/90 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-900 shadow-sm">
                  HAZARD ZONE
                </span>
              </div>

              {/* Equipment station H-01 Indicator */}
              <div className="absolute top-[67%] left-[23%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow shadow-blue-500/30">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="text-[9px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 px-1 rounded border border-blue-200 dark:border-blue-900">
                  H-01 Station
                </span>
              </div>

            </div>

            {/* Map Legend */}
            <div className="bg-muted/30 border border-border rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-rose-600 rounded-full flex items-center justify-center text-white"><Navigation className="w-2.5 h-2.5 rotate-45" /></div>
                <span className="text-muted-foreground">Your Location</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white"><Flame className="w-2.5 h-2.5" /></div>
                <span className="text-muted-foreground">Fire Hazard</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-blue-600 rounded-lg flex items-center justify-center text-white"><Droplets className="w-2.5 h-2.5" /></div>
                <span className="text-muted-foreground">Hydrant / Extinguisher</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-1 border-t-2 border-dashed border-rose-600"></div>
                <span className="text-muted-foreground">Detoured Path</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </RoleDashboardLayout>
  );
};

export default LiveNavigation;
