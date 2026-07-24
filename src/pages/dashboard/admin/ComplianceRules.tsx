import React, { useState } from 'react';
import RoleDashboardLayout from '@/layouts/RoleDashboardLayout';
import { Shield, Plus, CheckCircle, Edit, Trash2, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Templates list is now managed via component state

const ComplianceRules: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRule, setNewRule] = useState({ name: '', standard: '', description: '' });
  
  const [tpls, setTpls] = useState([
    { id: 'TPL-001', name: 'NBC 2016 — Standard Compliance', standard: 'NBC', version: '2016', applicableTo: ['Commercial', 'Residential', 'Industrial'], status: 'active', orgsUsing: 98, checkpoints: 142, lastUpdated: 'Jul 1, 2025' },
    { id: 'TPL-002', name: 'NFPA 101 — Life Safety Code', standard: 'NFPA', version: '2021', applicableTo: ['Healthcare', 'Educational', 'Assembly'], status: 'active', orgsUsing: 67, checkpoints: 188, lastUpdated: 'Jun 15, 2025' },
    { id: 'TPL-003', name: 'NFPA 72 — Fire Alarm Systems', standard: 'NFPA', version: '2022', applicableTo: ['All'], status: 'active', orgsUsing: 115, checkpoints: 96, lastUpdated: 'May 20, 2025' },
    { id: 'TPL-004', name: 'TAC — Tariff Advisory Committee', standard: 'TAC', version: '2024', applicableTo: ['Commercial', 'Industrial'], status: 'active', orgsUsing: 45, checkpoints: 78, lastUpdated: 'Jul 10, 2025' },
    { id: 'TPL-005', name: 'IS 2189 — Fire Detection & Alarm', standard: 'BIS', version: '2023', applicableTo: ['All'], status: 'draft', orgsUsing: 0, checkpoints: 64, lastUpdated: 'Jul 20, 2025' },
  ]);
  const [editingTpl, setEditingTpl] = useState<typeof tpls[0] | null>(null);

  const handleSaveDraft = () => {
    if (!newRule.name) {
      toast.error('Template name is required.');
      return;
    }
    const draft = {
      id: `TPL-0${tpls.length + 1}`,
      name: newRule.name,
      standard: newRule.standard || 'Custom',
      version: '2026',
      applicableTo: ['All'],
      status: 'draft',
      orgsUsing: 0,
      checkpoints: 24,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setTpls(prev => [...prev, draft]);
    setShowAddForm(false);
    setNewRule({ name: '', standard: '', description: '' });
    toast.success('Template added as draft successfully!');
  };

  const handlePublish = (id: string) => {
    setTpls(prev => prev.map(t => t.id === id ? { ...t, status: 'active' } : t));
    toast.success('Compliance template published successfully!');
  };

  const handleRemove = (id: string, orgsUsing: number) => {
    if (orgsUsing > 0) {
      toast.error('Cannot delete templates with active organizations.');
      return;
    }
    setTpls(prev => prev.filter(t => t.id !== id));
    toast.success('Template removed successfully.');
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTpl) return;
    setTpls(prev => prev.map(t => t.id === editingTpl.id ? editingTpl : t));
    setEditingTpl(null);
    toast.success('Template updated successfully!');
  };

  return (
    <RoleDashboardLayout title="Compliance Rules">
      <div className="p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Compliance Rules & Templates</h2>
            <p className="text-sm text-muted-foreground">Configure regulatory compliance templates available to organizations</p>
          </div>
          <Button size="sm" className="gradient-fire text-white border-0 hover:opacity-90" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-4 h-4 mr-2" />Add Template
          </Button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Active Templates', value: tpls.filter(t => t.status === 'active').length, color: 'text-green-600 dark:text-green-400' },
            { label: 'Draft Templates', value: tpls.filter(t => t.status === 'draft').length, color: 'text-orange-600 dark:text-orange-400' },
            { label: 'Total Checkpoints', value: tpls.reduce((s, t) => s + t.checkpoints, 0), color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Organizations Using', value: tpls.reduce((s, t) => s + t.orgsUsing, 0), color: 'text-purple-600 dark:text-purple-400' },
          ].map(s => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className={`text-2xl font-black ${s.color}`} style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Add Template Form */}
        {showAddForm && (
          <div className="bg-card border border-slate-200 dark:border-slate-700 rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-sm">Add New Compliance Template</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Template Name</label>
                <input className="input-field text-sm" placeholder="e.g. NFPA 13 — Sprinkler Systems" value={newRule.name} onChange={e => setNewRule(p => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Standard Body</label>
                <select className="input-field text-sm" value={newRule.standard} onChange={e => setNewRule(p => ({ ...p, standard: e.target.value }))}>
                  <option value="">Select...</option>
                  <option>NBC</option>
                  <option>NFPA</option>
                  <option>BIS</option>
                  <option>TAC</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium mb-1">Description</label>
                <textarea className="input-field text-sm resize-none" rows={2} placeholder="Brief description..." value={newRule.description} onChange={e => setNewRule(p => ({ ...p, description: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button size="sm" className="gradient-fire text-white border-0 font-semibold" onClick={handleSaveDraft}>Save as Draft</Button>
            </div>
          </div>
        )}

        {/* Templates List */}
        <div className="space-y-3">
          {tpls.map(tpl => (
            <div key={tpl.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                className="w-full px-4 py-4 flex items-center gap-3 hover:bg-muted/30 transition-colors text-left"
                onClick={() => setExpanded(expanded === tpl.id ? null : tpl.id)}
              >
                <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm">{tpl.name}</p>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${tpl.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'}`}>{tpl.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{tpl.standard} · {tpl.checkpoints} checkpoints · {tpl.orgsUsing} orgs using</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${expanded === tpl.id ? 'rotate-180' : ''}`} />
              </button>
              {expanded === tpl.id && (
                <div className="px-4 pb-4 border-t border-border bg-muted/20">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 mb-3 text-sm">
                    <div><p className="text-xs text-muted-foreground">Version</p><p className="font-medium">{tpl.version}</p></div>
                    <div><p className="text-xs text-muted-foreground">Checkpoints</p><p className="font-medium">{tpl.checkpoints}</p></div>
                    <div><p className="text-xs text-muted-foreground">Using</p><p className="font-medium">{tpl.orgsUsing} orgs</p></div>
                    <div><p className="text-xs text-muted-foreground">Updated</p><p className="font-medium">{tpl.lastUpdated}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <p className="text-xs text-muted-foreground w-full mb-1">Applicable to:</p>
                    {tpl.applicableTo.map(a => <span key={a} className="text-xs bg-muted px-2 py-0.5 rounded">{a}</span>)}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs font-semibold hover:opacity-90" onClick={() => setEditingTpl(tpl)}>
                      <Edit className="w-3 h-3 mr-1" />Edit
                    </Button>
                    {tpl.status === 'draft' && (
                      <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700 text-white border-0 font-semibold hover:opacity-90" onClick={() => handlePublish(tpl.id)}>
                        <CheckCircle className="w-3 h-3 mr-1" />Publish
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="text-xs text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 font-semibold hover:opacity-90" onClick={() => handleRemove(tpl.id, tpl.orgsUsing)}>
                      <Trash2 className="w-3 h-3 mr-1" />Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Compliance Template Modal */}
      {editingTpl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 text-left">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/20">
              <h3 className="font-bold text-base">Edit Template: {editingTpl.id}</h3>
              <button
                onClick={() => setEditingTpl(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEditSave}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Template Name</label>
                  <input
                    type="text"
                    required
                    className="input-field text-sm"
                    value={editingTpl.name}
                    onChange={e => setEditingTpl(p => p ? ({ ...p, name: e.target.value }) : null)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Standard Body</label>
                    <input
                      type="text"
                      required
                      className="input-field text-sm"
                      value={editingTpl.standard}
                      onChange={e => setEditingTpl(p => p ? ({ ...p, standard: e.target.value }) : null)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Version</label>
                    <input
                      type="text"
                      required
                      className="input-field text-sm font-mono"
                      value={editingTpl.version}
                      onChange={e => setEditingTpl(p => p ? ({ ...p, version: e.target.value }) : null)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Checkpoints Count</label>
                  <input
                    type="number"
                    required
                    className="input-field text-sm"
                    value={editingTpl.checkpoints}
                    onChange={e => setEditingTpl(p => p ? ({ ...p, checkpoints: Number(e.target.value) }) : null)}
                  />
                </div>
              </div>
              <div className="px-6 py-3 border-t border-border flex justify-end gap-2 bg-muted/20">
                <Button type="button" size="sm" variant="outline" onClick={() => setEditingTpl(null)}>Cancel</Button>
                <Button type="submit" size="sm" className="gradient-fire text-white border-0">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </RoleDashboardLayout>
  );
};

export default ComplianceRules;
