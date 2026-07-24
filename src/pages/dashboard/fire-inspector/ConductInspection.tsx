import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { QrCode, CheckCircle, XCircle, AlertTriangle, Camera, Mic, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const steps = ['Setup', 'Checklist', 'Photos', 'Summary'];

const checklistItems = [
  { id: 1, category: 'Physical Condition', items: [
    { id: 'c1', text: 'Extinguisher is properly mounted and accessible', required: true },
    { id: 'c2', text: 'Safety pin is intact and tamper seal is unbroken', required: true },
    { id: 'c3', text: 'No visible damage, corrosion, or dents on cylinder', required: true },
    { id: 'c4', text: 'Operating instructions are legible and facing outward', required: true },
  ]},
  { id: 2, category: 'Gauge & Pressure', items: [
    { id: 'c5', text: 'Pressure gauge needle is in the green zone', required: true },
    { id: 'c6', text: 'No signs of pressure loss or overcharge', required: true },
  ]},
  { id: 3, category: 'Certification & Records', items: [
    { id: 'c7', text: 'Last inspection date is within required period', required: true },
    { id: 'c8', text: 'Inspection tag is present and up to date', required: true },
    { id: 'c9', text: 'Hydrostatic test date is within required period', required: false },
  ]},
  { id: 4, category: 'Location & Signage', items: [
    { id: 'c10', text: 'Fire extinguisher sign is clearly visible', required: true },
    { id: 'c11', text: 'Area is free of obstructions (18-inch clearance)', required: true },
    { id: 'c12', text: 'Equipment ID matches facility register', required: true },
  ]},
];

const ConductInspection: React.FC = () => {
  const [step, setStep] = useState(0);
  const [facility, setFacility] = useState('');
  const [equipment, setEquipment] = useState('');
  const [inspector, setInspector] = useState('Suresh Kumar');
  const [results, setResults] = useState<Record<string, 'pass' | 'fail' | null>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [globalNote, setGlobalNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allRequired = checklistItems.flatMap(c => c.items.filter(i => i.required));
  const completedRequired = allRequired.filter(i => results[i.id] !== undefined && results[i.id] !== null);
  const passCount = Object.values(results).filter(v => v === 'pass').length;
  const failCount = Object.values(results).filter(v => v === 'fail').length;
  const totalItems = checklistItems.flatMap(c => c.items).length;

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    toast.success('Inspection submitted successfully!');
  };

  if (submitted) {
    const score = Math.round((passCount / totalItems) * 100);
    return (
      <RoleDashboardLayout title="Inspection Submitted">
        <div className="p-4 sm:p-6 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Inspection Complete!</h2>
            <p className="text-muted-foreground mb-2">Inspection report has been submitted successfully.</p>
            <div className="text-5xl font-black gradient-fire-text my-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{score}%</div>
            <p className="text-sm text-muted-foreground mb-6">{passCount} passed · {failCount} failed · {totalItems - passCount - failCount} skipped</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => { setStep(0); setSubmitted(false); setResults({}); }}>New Inspection</Button>
              <Button className="gradient-fire text-white border-0" onClick={() => toast.success('Report downloading...')}>Download Report</Button>
            </div>
          </div>
        </div>
      </RoleDashboardLayout>
    );
  }

  return (
    <RoleDashboardLayout title="Conduct Inspection">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Conduct Inspection</h2>
          <p className="text-sm text-muted-foreground">Step-by-step equipment inspection workflow</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-2 ${i <= step ? 'text-orange-600 dark:text-orange-400' : 'text-muted-foreground'}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${i < step ? 'bg-orange-500 border-orange-500 text-white' : i === step ? 'border-orange-500 text-orange-600' : 'border-muted-foreground'}`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className="text-xs font-medium hidden sm:block">{s}</span>
              </div>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-orange-500' : 'bg-muted'}`} />}
            </React.Fragment>
          ))}
        </div>

        {/* Step 0: Setup */}
        {step === 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold">Inspection Setup</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Facility *</label>
                <select className="input-field" value={facility} onChange={e => setFacility(e.target.value)}>
                  <option value="">Select facility...</option>
                  <option>Main Building</option>
                  <option>Warehouse B</option>
                  <option>Data Center</option>
                  <option>Office Block C</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Equipment ID / Scan QR *</label>
                <div className="flex gap-2">
                  <input className="input-field flex-1" placeholder="e.g. EQ-001" value={equipment} onChange={e => setEquipment(e.target.value)} />
                  <Button size="sm" variant="outline" onClick={() => { setEquipment('EQ-001'); toast.success('QR Code scanned: EQ-001'); }}>
                    <QrCode className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Inspector Name</label>
                <input className="input-field" value={inspector} onChange={e => setInspector(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Date & Time</label>
                <input className="input-field" defaultValue={new Date().toLocaleString()} readOnly />
              </div>
            </div>
            <Button className="gradient-fire text-white border-0 hover:opacity-90" onClick={() => { if (!facility || !equipment) { toast.error('Please fill facility and equipment ID'); return; } setStep(1); }}>
              Start Inspection <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 1: Checklist */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-orange-700 dark:text-orange-400">Inspecting: {equipment} at {facility}</span>
              <span className="text-xs text-orange-600 dark:text-orange-500">{completedRequired.length}/{allRequired.length} required done</span>
            </div>
            {checklistItems.map(cat => (
              <div key={cat.id} className="bg-card border border-border rounded-2xl p-5">
                <h4 className="font-semibold mb-3 text-sm">{cat.category}</h4>
                <div className="space-y-3">
                  {cat.items.map(item => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="flex gap-1 flex-shrink-0 mt-0.5">
                        <button onClick={() => setResults(p => ({ ...p, [item.id]: 'pass' }))} className={`w-7 h-7 rounded flex items-center justify-center transition-all ${results[item.id] === 'pass' ? 'bg-green-500 text-white' : 'bg-muted hover:bg-green-100 dark:hover:bg-green-900/20 text-muted-foreground hover:text-green-600'}`}>
                          <CheckCircle className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setResults(p => ({ ...p, [item.id]: 'fail' }))} className={`w-7 h-7 rounded flex items-center justify-center transition-all ${results[item.id] === 'fail' ? 'bg-red-500 text-white' : 'bg-muted hover:bg-red-100 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-600'}`}>
                          <XCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${!item.required ? 'text-muted-foreground' : ''}`}>{item.text} {!item.required && <span className="text-xs opacity-60">(optional)</span>}</p>
                        {results[item.id] === 'fail' && (
                          <input className="input-field mt-2 text-xs py-1.5" placeholder="Add failure note..." value={notes[item.id] || ''} onChange={e => setNotes(p => ({ ...p, [item.id]: e.target.value }))} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(0)}><ChevronLeft className="w-4 h-4 mr-2" />Back</Button>
              <Button className="gradient-fire text-white border-0" onClick={() => setStep(2)}>Next: Photos <ChevronRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Photo Evidence</h3>
              <p className="text-sm text-muted-foreground mb-4">Attach photos and voice notes as evidence</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {['Equipment Front View', 'Pressure Gauge', 'Serial Number Tag'].map(label => (
                  <div key={label} className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-orange-400 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer bg-muted/30 hover:bg-orange-50 dark:hover:bg-orange-900/10" onClick={() => toast.success(`Photo captured: ${label}`)}>
                    <Camera className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground text-center px-2">{label}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => toast.success('Voice note recording started...')}>
                <Mic className="w-4 h-4" />Record Voice Note
              </Button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Additional Notes</h3>
              <textarea className="input-field resize-none" rows={4} placeholder="Any additional observations..." value={globalNote} onChange={e => setGlobalNote(e.target.value)} />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}><ChevronLeft className="w-4 h-4 mr-2" />Back</Button>
              <Button className="gradient-fire text-white border-0" onClick={() => setStep(3)}>Review Summary <ChevronRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>
        )}

        {/* Step 3: Summary */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Inspection Summary</h3>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div className="text-3xl font-black text-green-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{passCount}</div>
                  <div className="text-xs text-muted-foreground mt-1">Passed</div>
                </div>
                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <div className="text-3xl font-black text-red-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{failCount}</div>
                  <div className="text-xs text-muted-foreground mt-1">Failed</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-xl">
                  <div className="text-3xl font-black text-muted-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{totalItems - passCount - failCount}</div>
                  <div className="text-xs text-muted-foreground mt-1">Skipped</div>
                </div>
              </div>
              <div className="space-y-2 text-sm border-t border-border pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Equipment</span><span className="font-medium">{equipment}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Facility</span><span className="font-medium">{facility}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Inspector</span><span className="font-medium">{inspector}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Score</span><span className="font-bold text-orange-600">{Math.round((passCount / totalItems) * 100)}%</span></div>
              </div>
              {failCount > 0 && <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"><p className="text-xs text-red-700 dark:text-red-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{failCount} item(s) failed inspection — report will include failure details.</p></div>}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}><ChevronLeft className="w-4 h-4 mr-2" />Back</Button>
              <Button className="gradient-fire text-white border-0 hover:opacity-90" onClick={handleSubmit} disabled={submitting}>
                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Submit Inspection Report'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
};

export default ConductInspection;
