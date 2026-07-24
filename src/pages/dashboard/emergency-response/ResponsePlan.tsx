import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Map, ChevronDown, ChevronRight, AlertTriangle, CheckCircle, Users, Phone, Flame } from 'lucide-react';

const plans = [
  {
    id: 'PLAN-001',
    title: 'Fire Emergency Response Plan',
    trigger: 'Fire alarm activation / visible fire / smoke detection',
    severity: 'critical',
    steps: [
      { step: 1, action: 'Raise alarm immediately — activate nearest manual call point', responsible: 'First Responder', timeLimit: '30 sec' },
      { step: 2, action: 'Call emergency services: Fire Department (101), Ambulance (108)', responsible: 'Emergency Warden', timeLimit: '1 min' },
      { step: 3, action: 'Initiate building evacuation — all zones via intercoms', responsible: 'Safety Officer', timeLimit: '2 min' },
      { step: 4, action: 'Direct personnel to nearest emergency exits and assembly points', responsible: 'Floor Wardens', timeLimit: '5 min' },
      { step: 5, action: 'Account for all personnel at assembly points using headcount', responsible: 'Emergency Wardens', timeLimit: '10 min' },
      { step: 6, action: 'Isolate power and gas supply if safe to do so', responsible: 'Maintenance Tech', timeLimit: '3 min' },
      { step: 7, action: 'Brief incoming fire department on building layout and hazards', responsible: 'Safety Officer', timeLimit: 'On arrival' },
      { step: 8, action: 'Document incident details for post-incident report', responsible: 'Safety Officer', timeLimit: 'After incident' },
    ],
    contacts: [
      { name: 'Fire Dept Emergency', number: '101' },
      { name: 'Ambulance', number: '108' },
      { name: 'Safety Officer', number: '+91 98001 10001' },
      { name: 'Emergency Warden', number: '+91 98001 10002' },
    ],
    resources: ['Fire extinguishers (ABC type)', 'Emergency exit maps', 'First aid kit', 'Assembly point signs'],
  },
  {
    id: 'PLAN-002',
    title: 'Gas Leak Response Plan',
    trigger: 'Gas detector alarm / smell of gas / staff report',
    severity: 'high',
    steps: [
      { step: 1, action: 'Do NOT operate any electrical switches or create sparks', responsible: 'All Personnel', timeLimit: 'Immediate' },
      { step: 2, action: 'Shut off main gas supply valve at utility room', responsible: 'Maintenance Tech', timeLimit: '1 min' },
      { step: 3, action: 'Evacuate area immediately — ventilate by opening windows/doors', responsible: 'Emergency Warden', timeLimit: '2 min' },
      { step: 4, action: 'Call gas utility emergency line and fire department', responsible: 'Safety Officer', timeLimit: '2 min' },
      { step: 5, action: 'Cordon off affected area — restrict access 50m radius', responsible: 'Security', timeLimit: '5 min' },
      { step: 6, action: 'Await clearance from gas utility/fire dept before re-entry', responsible: 'Safety Officer', timeLimit: 'Post clearance' },
    ],
    contacts: [
      { name: 'Gas Utility Emergency', number: '1800-XX-XXXX' },
      { name: 'Fire Dept', number: '101' },
    ],
    resources: ['Gas detector', 'PPE kit', 'Cordon tape', 'Gas isolation valve key'],
  },
  {
    id: 'PLAN-003',
    title: 'Medical Emergency Plan',
    trigger: 'Personal injury, collapse, cardiac event',
    severity: 'high',
    steps: [
      { step: 1, action: 'Call for medical help immediately — 108 or on-site medical', responsible: 'First on Scene', timeLimit: '30 sec' },
      { step: 2, action: 'Administer first aid if trained — do not move injured person', responsible: 'First Aider', timeLimit: '1 min' },
      { step: 3, action: 'Clear area around patient — assign someone to wait for ambulance', responsible: 'Emergency Warden', timeLimit: '2 min' },
      { step: 4, action: 'AED defibrillator location: Near reception desk, G Floor', responsible: 'First Aider', timeLimit: '2 min' },
      { step: 5, action: 'Document incident and report to safety officer', responsible: 'Supervisor', timeLimit: 'Post incident' },
    ],
    contacts: [
      { name: 'Ambulance', number: '108' },
      { name: 'On-site Medical', number: '+91 98001 10010' },
    ],
    resources: ['First aid kit (all floors)', 'AED defibrillator (G Floor reception)', 'Emergency contacts board'],
  },
];

const severityConfig: Record<string, string> = {
  critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  high: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
};

const ResponsePlan: React.FC = () => {
  const [expanded, setExpanded] = useState<string>('PLAN-001');

  return (
    <RoleDashboardLayout title="Emergency Response Plans">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Emergency Response Plans</h2>
          <p className="text-sm text-muted-foreground">Standard operating procedures for different emergency types</p>
        </div>

        {/* Plans */}
        <div className="space-y-4">
          {plans.map(plan => (
            <div key={plan.id} className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Header */}
              <button
                className="w-full px-5 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left"
                onClick={() => setExpanded(expanded === plan.id ? '' : plan.id)}
              >
                <div className="w-10 h-10 gradient-fire rounded-xl flex items-center justify-center flex-shrink-0">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{plan.title}</p>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityConfig[plan.severity]}`}>{plan.severity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Trigger: {plan.trigger}</p>
                </div>
                {expanded === plan.id ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
              </button>

              {/* Content */}
              {expanded === plan.id && (
                <div className="px-5 pb-5 border-t border-border">
                  {/* Steps */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Response Steps</p>
                    <div className="space-y-2">
                      {plan.steps.map(step => (
                        <div key={step.step} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full gradient-fire flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{step.action}</p>
                            <div className="flex gap-3 mt-0.5 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{step.responsible}</span>
                              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" />{step.timeLimit}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contacts */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Emergency Contacts</p>
                    <div className="grid grid-cols-2 gap-2">
                      {plan.contacts.map(c => (
                        <div key={c.name} className="flex items-center gap-2 text-sm p-2 bg-muted/40 rounded-lg">
                          <Phone className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-xs">{c.name}</p>
                            <p className="text-rose-600 dark:text-rose-400 text-xs font-mono">{c.number}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Required Resources</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.resources.map(r => (
                        <span key={r} className="text-xs bg-muted px-2 py-1 rounded">{r}</span>
                      ))}
                    </div>
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

export default ResponsePlan;
