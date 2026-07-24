import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { CheckSquare, Check, Clock, MapPin, CheckCircle, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ticketsToClose = [
  { id: 'WO-087', equipment: 'Hydrant H-05', type: 'Pressure Inspection', location: 'Parking Complex, Level 1', completedAt: 'Jul 27, 2025', duration: '2h', techName: 'Rajesh Singh', checklist: ['Valve inspected and cleaned', 'Supply line pressure tested at 7 bar', 'All fittings checked — no leaks', 'Flow test completed', 'Area cleaned and clear'], partsUsed: ['Valve Seal Kit'], cost: 1200, signOff: false },
  { id: 'WO-085', equipment: 'Hose Reel HR-02', type: 'Annual Service', location: 'Warehouse B, 2nd Floor', completedAt: 'Jul 27, 2025', duration: '1h 15min', techName: 'Mohan Kumar', checklist: ['Hose full unwound and inspected', 'Nozzle tested and replaced', 'Valve operation checked', 'Hose rewound and mounted securely'], partsUsed: ['Nozzle Washer Set', 'Valve O-Ring'], cost: 780, signOff: false },
];

const closedTickets = [
  { id: 'WO-084', equipment: 'Extinguisher EXT-015', type: 'Refill', location: 'Canteen, G Floor', closedAt: 'Jul 25, 2025', score: 100 },
  { id: 'WO-082', equipment: 'Smoke Detector SMK-011', type: 'Calibration', location: 'Warehouse B, Bay 1', closedAt: 'Jun 28, 2025', score: 100 },
];

const CloseTickets: React.FC = () => {
  const [tickets, setTickets] = useState(ticketsToClose.map(t => ({ ...t, checklistDone: t.checklist.map(() => false), clientSignOff: false, finalNote: '' })));
  const [closing, setClosing] = useState<string | null>(null);
  const [closedList, setClosedList] = useState(closedTickets);

  const handleCheckItem = (ticketId: string, idx: number) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t;
      const checklistDone = [...t.checklistDone];
      checklistDone[idx] = !checklistDone[idx];
      return { ...t, checklistDone };
    }));
  };

  const handleSignOff = (ticketId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, clientSignOff: !t.clientSignOff } : t));
  };

  const handleClose = async (ticket: typeof tickets[0]) => {
    const allChecked = ticket.checklistDone.every(Boolean);
    if (!allChecked) { toast.error('Please complete all checklist items before closing.'); return; }
    if (!ticket.clientSignOff) { toast.error('Client sign-off required to close ticket.'); return; }
    setClosing(ticket.id);
    await new Promise(r => setTimeout(r, 1200));
    setClosedList(prev => [{ id: ticket.id, equipment: ticket.equipment, type: ticket.type, location: ticket.location, closedAt: 'Jul 28, 2025', score: 100 }, ...prev]);
    setTickets(prev => prev.filter(t => t.id !== ticket.id));
    setClosing(null);
    toast.success(`Ticket ${ticket.id} closed successfully!`);
  };

  return (
    <RoleDashboardLayout title="Close Tickets">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Close Work Order Tickets</h2>
          <p className="text-sm text-muted-foreground">Verify completion checklist, get sign-off, and close completed tickets</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-black text-orange-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{tickets.length}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Ready to Close</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-black text-green-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{closedList.length}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Closed This Month</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-black text-blue-600" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>100%</div>
            <div className="text-xs text-muted-foreground mt-0.5">Satisfaction Rate</div>
          </div>
        </div>

        {/* Tickets Ready to Close */}
        {tickets.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Work Orders Ready to Close ({tickets.length})</h3>
            {tickets.map(ticket => {
              const completedCount = ticket.checklistDone.filter(Boolean).length;
              const allDone = completedCount === ticket.checklist.length;
              return (
                <div key={ticket.id} className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-muted-foreground">{ticket.id}</span>
                        <span className="text-sm font-semibold">{ticket.equipment}</span>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ticket.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Completed: {ticket.completedAt} · {ticket.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-blue-600">
                      <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">{completedCount}</span>
                      <span>/</span>
                      <span>{ticket.checklist.length}</span>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="bg-muted/30 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Completion Checklist</p>
                    <div className="space-y-2">
                      {ticket.checklist.map((item, idx) => (
                        <button key={idx} className="flex items-center gap-2 w-full text-left" onClick={() => handleCheckItem(ticket.id, idx)}>
                          <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all border-2 ${ticket.checklistDone[idx] ? 'bg-green-500 border-green-500' : 'border-muted-foreground hover:border-green-400'}`}>
                            {ticket.checklistDone[idx] && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-sm ${ticket.checklistDone[idx] ? 'line-through text-muted-foreground' : ''}`}>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parts & Cost */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div><p className="text-xs text-muted-foreground mb-1">Parts Used</p><p>{ticket.partsUsed.join(', ') || 'None'}</p></div>
                    <div><p className="text-xs text-muted-foreground mb-1">Service Cost</p><p className="font-semibold">₹{ticket.cost.toLocaleString()}</p></div>
                  </div>

                  {/* Final Note */}
                  <div className="mb-4">
                    <label className="block text-xs font-medium mb-1.5">Closing Note (Optional)</label>
                    <textarea className="input-field resize-none text-sm" rows={2} placeholder="Any final remarks..." value={ticket.finalNote} onChange={e => setTickets(prev => prev.map(t => t.id === ticket.id ? { ...t, finalNote: e.target.value } : t))} />
                  </div>

                  {/* Client Sign-Off */}
                  <div className={`p-3 rounded-xl border-2 cursor-pointer transition-all mb-4 ${ticket.clientSignOff ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-dashed border-border hover:border-blue-400'}`} onClick={() => handleSignOff(ticket.id)}>
                    <div className="flex items-center gap-2">
                      {ticket.clientSignOff ? <CheckCircle className="w-5 h-5 text-green-500" /> : <FileText className="w-5 h-5 text-muted-foreground" />}
                      <p className="text-sm font-medium">{ticket.clientSignOff ? 'Client Sign-Off Obtained' : 'Click to Record Client Sign-Off'}</p>
                    </div>
                  </div>

                  <Button
                    className={`w-full ${allDone && ticket.clientSignOff ? 'gradient-fire text-white border-0 hover:opacity-90' : 'opacity-50 cursor-not-allowed bg-muted text-muted-foreground border-0'}`}
                    disabled={!allDone || !ticket.clientSignOff || closing === ticket.id}
                    onClick={() => handleClose(ticket)}
                  >
                    {closing === ticket.id ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" /> : <CheckSquare className="w-4 h-4 mr-2" />}
                    Close Ticket {ticket.id}
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <p className="font-semibold">All tickets closed!</p>
            <p className="text-sm text-muted-foreground mt-1">No work orders pending closure at this time.</p>
          </div>
        )}

        {/* Closed Tickets */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm">Recently Closed ({closedList.length})</h3>
          </div>
          <div className="divide-y divide-border">
            {closedList.map(t => (
              <div key={t.id} className="px-4 py-3 flex items-center gap-3 opacity-70">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{t.equipment} — {t.type}</p>
                  <p className="text-xs text-muted-foreground">{t.location} · Closed {t.closedAt}</p>
                </div>
                <span className="text-xs font-bold text-green-600">✓ {t.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default CloseTickets;
