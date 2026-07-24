import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Users, Award, Clock, Phone, Mail, CheckCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const teamMembers = [
  { id: 'TM-001', name: 'Suresh Kumar', role: 'Fire Inspector', facility: 'Hospital Main', currentTask: 'Monthly Inspection — OPD Block', taskDue: 'Today 3:00 PM', status: 'active', completedThisMonth: 18, phone: '+91 98001 11001', email: 'suresh.k@apollo.com', certifications: ['NBC Inspector', 'NFPA 72'] },
  { id: 'TM-002', name: 'Vikram Nair', role: 'Fire Inspector', facility: 'Childrens Wing', currentTask: 'Suppression System Check', taskDue: 'Tomorrow 9:00 AM', status: 'active', completedThisMonth: 14, phone: '+91 98001 11002', email: 'vikram.n@apollo.com', certifications: ['NBC Inspector', 'HAZMAT'] },
  { id: 'TM-003', name: 'Rajesh Singh', role: 'Maintenance Tech', facility: 'All Facilities', currentTask: 'WO-088 — Smoke Detector Repair', taskDue: 'Today 5:00 PM', status: 'in_field', completedThisMonth: 22, phone: '+91 98001 11003', email: 'rajesh.s@apollo.com', certifications: ['Equipment Tech Certified'] },
  { id: 'TM-004', name: 'Mohan Kumar', role: 'Maintenance Tech', facility: 'Research Block', currentTask: 'Annual Hose Reel Service', taskDue: 'Aug 5', status: 'active', completedThisMonth: 16, phone: '+91 98001 11004', email: 'mohan.k@apollo.com', certifications: ['Equipment Tech Certified', 'Pump Specialist'] },
  { id: 'TM-005', name: 'Ananya Patel', role: 'Safety Coordinator', facility: 'Admin Building', currentTask: 'Compliance documentation update', taskDue: 'Jul 31', status: 'office', completedThisMonth: 8, phone: '+91 98001 11005', email: 'ananya.p@apollo.com', certifications: ['Safety Management', 'ISO 45001'] },
  { id: 'TM-006', name: 'Deepak Verma', role: 'Emergency Warden', facility: 'Hospital Main', currentTask: 'Evacuation drill preparation', taskDue: 'Aug 2', status: 'active', completedThisMonth: 5, phone: '+91 98001 11006', email: 'deepak.v@apollo.com', certifications: ['Emergency Warden', 'First Aid'] },
];

const statusConfig: Record<string, string> = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  in_field: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  office: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  off_duty: 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400',
};

const upcomingDrills = [
  { type: 'Fire Evacuation Drill', facility: 'Hospital Main', date: 'Aug 2, 2025', participants: 120, warden: 'Deepak Verma' },
  { type: 'Smoke Alert Response', facility: 'Childrens Wing', date: 'Aug 8, 2025', participants: 65, warden: 'Vikram Nair' },
  { type: 'Full Emergency Drill', facility: 'Research Block', date: 'Aug 15, 2025', participants: 40, warden: 'Deepak Verma' },
];

const TeamCoordination: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  return (
    <RoleDashboardLayout title="Team Coordination">
      <div className="p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-xl font-bold">Team Coordination</h2>
          <p className="text-sm text-muted-foreground">Manage team assignments, track workload, and coordinate activities</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Team', value: teamMembers.length, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'In Field', value: teamMembers.filter(t => t.status === 'in_field').length, color: 'text-green-600 dark:text-green-400' },
            { label: 'Tasks This Month', value: teamMembers.reduce((s, t) => s + t.completedThisMonth, 0), color: 'text-purple-600 dark:text-purple-400' },
            { label: 'Upcoming Drills', value: upcomingDrills.length, color: 'text-orange-600 dark:text-orange-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-400 font-bold text-sm flex-shrink-0">
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{member.name}</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">{member.role}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded mt-1 inline-block ${statusConfig[member.status]}`}>{member.status.replace('_', ' ')}</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                <p className="font-medium text-foreground mb-0.5 truncate">{member.currentTask}</p>
                <p className="flex items-center gap-1"><Clock className="w-3 h-3" />{member.taskDue}</p>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{member.facility}</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">{member.completedThisMonth} done this month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Drills */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-500" />Upcoming Drills & Training</h3>
          </div>
          <div className="divide-y divide-border">
            {upcomingDrills.map(drill => (
              <div key={drill.type} className="px-4 py-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0">
                  <span className="text-xs font-bold">{drill.date.split(' ')[1].replace(',', '')}</span>
                  <span className="text-xs opacity-80">{drill.date.split(' ')[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{drill.type}</p>
                  <p className="text-xs text-muted-foreground">{drill.facility} · {drill.participants} participants · Warden: {drill.warden}</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs flex-shrink-0" onClick={() => toast.success('Drill reminder sent!')}>Remind</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 text-lg font-bold">{selectedMember.name.charAt(0)}</div>
                <div>
                  <p className="font-semibold">{selectedMember.name}</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">{selectedMember.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Facility</span><span>{selectedMember.facility}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`px-1.5 py-0.5 rounded text-xs ${statusConfig[selectedMember.status]}`}>{selectedMember.status}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">This Month</span><span className="font-semibold">{selectedMember.completedThisMonth} tasks completed</span></div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Certifications</p>
                <div className="flex flex-wrap gap-1">{selectedMember.certifications.map(c => <span key={c} className="text-xs bg-muted px-2 py-0.5 rounded flex items-center gap-1"><Award className="w-3 h-3 text-purple-500" />{c}</span>)}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => toast.success(`Calling ${selectedMember.name}...`)}>
                  <Phone className="w-3 h-3 mr-1" />Call
                </Button>
                <Button size="sm" className="flex-1 text-xs gradient-fire text-white border-0" onClick={() => toast.success(`Message sent to ${selectedMember.name}`)}>
                  <Mail className="w-3 h-3 mr-1" />Message
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleDashboardLayout>
  );
};

export default TeamCoordination;
