import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Camera, Upload, File, Image, Trash2, MapPin, Tag, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const uploadedEvidence = [
  { id: 'EV-001', name: 'extinguisher_front_EQ001.jpg', type: 'image', size: '1.2 MB', location: 'Main Building, G Floor', tags: ['EQ-001', 'Extinguisher', 'Jul 2025'], date: 'Jul 22, 2025', url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=200&auto=format&fit=crop' },
  { id: 'EV-002', name: 'smoke_detector_offline_WB.jpg', type: 'image', size: '0.8 MB', location: 'Warehouse B, Bay 2', tags: ['EQ-014', 'Smoke Detector', 'Critical'], date: 'Jul 20, 2025', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop' },
  { id: 'EV-003', name: 'exit_light_failure_OBC3.jpg', type: 'image', size: '0.9 MB', location: 'Office Block C, 3F Stairwell', tags: ['EQ-003', 'Exit Light', 'Failure'], date: 'Jul 18, 2025', url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&auto=format&fit=crop' },
  { id: 'EV-004', name: 'hydrant_pressure_check_P1.jpg', type: 'image', size: '1.5 MB', location: 'Parking Complex, Level 1', tags: ['EQ-005', 'Hydrant', 'Maintenance'], date: 'Jul 15, 2025', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop' },
];

const EvidenceUpload: React.FC = () => {
  const [evidence, setEvidence] = useState(uploadedEvidence);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [newUpload, setNewUpload] = useState({ location: '', tags: '', description: '' });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!newUpload.location) { toast.error('Please specify the location.'); return; }
    if (!selectedFileUrl) { toast.error('Please select or upload a photo first.'); return; }
    setUploading(true);
    await new Promise(r => setTimeout(r, 1200));
    const newEv = {
      id: `EV-${Date.now()}`,
      name: selectedFile?.name || `evidence_${Date.now()}.jpg`,
      type: 'image',
      size: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.1 MB',
      location: newUpload.location,
      tags: newUpload.tags.split(',').map(t => t.trim()).filter(Boolean),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      url: selectedFileUrl,
    };
    setEvidence(prev => [newEv, ...prev]);
    setUploading(false);
    setShowUploadForm(false);
    setNewUpload({ location: '', tags: '', description: '' });
    setSelectedFile(null);
    setSelectedFileUrl(null);
    toast.success('Evidence uploaded and geo-tagged successfully!');
  };

  const handleDelete = (id: string) => {
    setEvidence(prev => prev.filter(e => e.id !== id));
    toast.success('Evidence removed.');
  };

  return (
    <RoleDashboardLayout title="Upload Evidence">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Upload Evidence</h2>
            <p className="text-sm text-muted-foreground">Upload geo-tagged photos and documents as inspection evidence</p>
          </div>
          <Button className="gradient-fire text-white border-0 hover:opacity-90 flex-shrink-0" size="sm" onClick={() => setShowUploadForm(!showUploadForm)}>
            <Camera className="w-4 h-4 mr-2" />Add Evidence
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Evidence', value: evidence.length, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'This Week', value: 3, color: 'text-orange-600 dark:text-orange-400' },
            { label: 'Critical Flags', value: 2, color: 'text-red-600 dark:text-red-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4 text-center">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upload Form */}
        {showUploadForm && (
          <div className="bg-card border border-orange-200 dark:border-orange-800/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Upload New Evidence</h3>
              <button onClick={() => setShowUploadForm(false)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"><X className="w-4 h-4" /></button>
            </div>
            {/* Drop Zone */}
            <div className="relative">
              {selectedFileUrl ? (
                <div className="border border-border rounded-xl p-4 flex items-center justify-between bg-muted/20">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={selectedFileUrl} alt="Preview" className="w-16 h-16 object-cover rounded-lg border" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{selectedFile?.name}</p>
                      <p className="text-xs text-muted-foreground">Ready to upload</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setSelectedFile(null);
                      setSelectedFileUrl(null);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <label className="border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer border-border hover:border-orange-400 hover:bg-muted/30 flex flex-col items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        setSelectedFile(file);
                        setSelectedFileUrl(URL.createObjectURL(file));
                        toast.success('Photo selected!');
                      }
                    }}
                  />
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium">Click to select or upload photo</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF — Max 10MB per file</p>
                </label>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Location *</label>
                <input className="input-field" placeholder="e.g. Main Building, G Floor Zone A" value={newUpload.location} onChange={e => setNewUpload(p => ({ ...p, location: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Tags (comma separated)</label>
                <input className="input-field" placeholder="e.g. EQ-001, Critical, Extinguisher" value={newUpload.tags} onChange={e => setNewUpload(p => ({ ...p, tags: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Description</label>
                <textarea className="input-field resize-none" rows={2} placeholder="Describe what this evidence shows..." value={newUpload.description} onChange={e => setNewUpload(p => ({ ...p, description: e.target.value }))} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="w-3 h-3 text-orange-500" />GPS coordinates will be auto-attached from your device</div>
            <Button className="gradient-fire text-white border-0 hover:opacity-90" size="sm" onClick={handleUpload} disabled={uploading}>
              {uploading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Uploading...</> : <><Upload className="w-4 h-4 mr-2" />Upload Evidence</>}
            </Button>
          </div>
        )}

        {/* Evidence Gallery */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm">Evidence Library ({evidence.length})</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
            {evidence.map(ev => (
              <div key={ev.id} className="border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative h-40 bg-muted overflow-hidden">
                  <img src={ev.url} alt={ev.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => handleDelete(ev.id)} className="w-7 h-7 rounded-lg bg-black/50 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-black/60 text-white flex items-center gap-1">
                      <Image className="w-3 h-3" />{ev.type}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{ev.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />{ev.location}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {ev.tags.map(tag => (
                      <span key={tag} className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{ev.date} · {ev.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </RoleDashboardLayout>
  );
};

export default EvidenceUpload;
