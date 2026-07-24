import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { GraduationCap, Play, CheckCircle, Clock, BookOpen, Star, Users, Award } from 'lucide-react';
import { toast } from 'sonner';

const courses = [
  { id: 'C001', title: 'Fire Safety Fundamentals', category: 'Core', duration: '3 hours', level: 'beginner', enrolled: 124, completed: 98, rating: 4.8, instructor: 'Vikram Nair', status: 'completed', progress: 100 },
  { id: 'C002', title: 'Emergency Evacuation Planning', category: 'Emergency', duration: '2 hours', level: 'intermediate', enrolled: 89, completed: 65, rating: 4.6, instructor: 'Priya Sharma', status: 'in_progress', progress: 60 },
  { id: 'C003', title: 'Fire Extinguisher Operation (PASS)', category: 'Practical', duration: '1 hour', level: 'beginner', enrolled: 156, completed: 142, rating: 4.9, instructor: 'Arjun Mehta', status: 'completed', progress: 100 },
  { id: 'C004', title: 'Advanced Risk Assessment Methods', category: 'Risk', duration: '4 hours', level: 'advanced', enrolled: 45, completed: 22, rating: 4.7, instructor: 'Deepika Rao', status: 'not_started', progress: 0 },
  { id: 'C005', title: 'NBC 2016 Compliance Requirements', category: 'Compliance', duration: '3.5 hours', level: 'intermediate', enrolled: 67, completed: 41, rating: 4.5, instructor: 'Rohit Gupta', status: 'not_started', progress: 0 },
  { id: 'C006', title: 'IoT Fire Safety Systems Operation', category: 'Technology', duration: '2.5 hours', level: 'intermediate', enrolled: 38, completed: 15, rating: 4.8, instructor: 'Kavitha Singh', status: 'in_progress', progress: 35 },
];

const drills = [
  { name: 'Monthly Evacuation Drill', date: '2025-07-30', building: 'Main Building', participants: 120, status: 'scheduled' },
  { name: 'Fire Suppression System Test', date: '2025-08-05', building: 'Data Center', participants: 15, status: 'scheduled' },
  { name: 'Emergency Response Drill', date: '2025-07-15', building: 'Hospital Wing A', participants: 85, status: 'completed' },
];

const levelConfig = {
  beginner: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  intermediate: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  advanced: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
};

const Training: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'drills' | 'certificates'>('courses');

  const completedCourses = courses.filter(c => c.status === 'completed').length;
  const certCount = courses.filter(c => c.status === 'completed').length;

  return (
    <DashboardLayout title="Training & Certification">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Courses Completed', value: completedCourses, icon: CheckCircle, color: 'text-green-500' },
            { label: 'In Progress', value: courses.filter(c => c.status === 'in_progress').length, icon: Clock, color: 'text-blue-500' },
            { label: 'Available', value: courses.filter(c => c.status === 'not_started').length, icon: BookOpen, color: 'text-orange-500' },
            { label: 'Certificates Earned', value: certCount, icon: Award, color: 'text-yellow-600 dark:text-yellow-400' },
          ].map(m => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="metric-card">
                <Icon className={`w-5 h-5 ${m.color} mb-2`} />
                <div className={`text-3xl font-black ${m.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted/50 p-1 rounded-xl w-fit">
          {(['courses', 'drills', 'certificates'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {courses.map(course => (
              <div key={course.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${levelConfig[course.level as keyof typeof levelConfig]}`}>{course.level}</span>
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">{course.category}</span>
                  </div>
                  {course.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                </div>
                <h3 className="font-bold mb-1 leading-tight">{course.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">By {course.instructor} · {course.duration}</p>

                {course.status === 'in_progress' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div className="h-full gradient-fire rounded-full transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1"><Users className="w-3 h-3" />{course.enrolled} enrolled</div>
                  <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{course.rating}</div>
                </div>

                <Button
                  className={`w-full text-sm ${course.status === 'completed' ? '' : 'gradient-fire text-white border-0 hover:opacity-90'}`}
                  variant={course.status === 'completed' ? 'outline' : 'default'}
                  size="sm"
                  onClick={() => {
                    if (course.status === 'completed') toast.success(`Certificate for "${course.title}" downloaded!`);
                    else if (course.status === 'in_progress') toast.info(`Resuming "${course.title}"...`);
                    else toast.success(`Enrolled in "${course.title}"!`);
                  }}
                >
                  {course.status === 'completed' ? <><Award className="w-3.5 h-3.5 mr-1.5" />View Certificate</> :
                   course.status === 'in_progress' ? <><Play className="w-3.5 h-3.5 mr-1.5" />Continue</> :
                   <><GraduationCap className="w-3.5 h-3.5 mr-1.5" />Enroll Now</>}
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Drills Tab */}
        {activeTab === 'drills' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Mock Drills & Exercises</h3>
              <Button size="sm" className="gradient-fire text-white border-0" onClick={() => toast.success('Drill scheduled!')}>Schedule Drill</Button>
            </div>
            {drills.map((drill, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-12 h-12 gradient-fire rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {new Date(drill.date).getDate()}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{drill.name}</h4>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-1">
                    <span>{drill.building}</span>
                    <span>{drill.participants} participants</span>
                    <span>{drill.date}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${drill.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>
                  {drill.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.filter(c => c.status === 'completed').map(course => (
              <div key={course.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800/40 rounded-xl p-5 text-center">
                <Award className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
                <h4 className="font-bold text-sm mb-1">{course.title}</h4>
                <p className="text-xs text-muted-foreground mb-4">Issued July 2025 · AgniSutra Academy</p>
                <Button size="sm" variant="outline" className="w-full border-yellow-400 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20" onClick={() => toast.success('Certificate downloaded!')}>
                  Download Certificate
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Training;
