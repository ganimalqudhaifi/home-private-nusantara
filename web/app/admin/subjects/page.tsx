'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Button } from '../../../src/components/shared/Button';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Subject {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

export default function AdminSubjectsPage() {
  const { data, error, mutate } = useSWR('/api/admin/subjects', fetcher);
  const subjects: Subject[] = data?.subjects || [];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    category: 'SD',
    description: '',
    is_active: true,
    display_order: 0,
  });

  const openAddModal = () => {
    setEditingSubject(null);
    setFormData({
      code: '',
      name: '',
      category: 'SD',
      description: '',
      is_active: true,
      display_order: subjects.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      code: subject.code,
      name: subject.name,
      category: subject.category,
      description: subject.description || '',
      is_active: subject.is_active,
      display_order: subject.display_order,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingSubject 
        ? `/api/admin/subjects/${editingSubject.id}`
        : '/api/admin/subjects';
      
      const res = await fetch(url, {
        method: editingSubject ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        mutate();
      } else {
        alert('Gagal menyimpan mata pelajaran.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus mata pelajaran ini? (Hati-hati jika sudah digunakan oleh tutor atau pemesanan)')) {
      try {
        const res = await fetch(`/api/admin/subjects/${id}`, { method: 'DELETE' });
        if (res.ok) {
          mutate();
        } else {
          alert('Gagal menghapus mata pelajaran.');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleStatus = async (subject: Subject) => {
    try {
      const res = await fetch(`/api/admin/subjects/${subject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !subject.is_active }),
      });
      if (res.ok) {
        mutate();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col">
            
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-whisper">
          <div>
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">Kelola Mata Pelajaran</h1>
            <p className="text-sm text-text-muted mt-0.5">Atur daftar mata pelajaran yang tersedia di formulir pendaftaran dan booking.</p>
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Mapel</span>
          </button>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6">Gagal memuat data.</div>}

        <div className="bg-white rounded-2xl border border-border-whisper shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
              <thead>
                <tr className="bg-surface-container-low/70 border-b border-border-whisper text-xs text-text-muted uppercase tracking-wider">
                  <th className="p-4 font-semibold w-auto">Nama Mapel</th>
                  <th className="p-4 font-semibold w-[140px]">Kategori</th>
                  <th className="p-4 font-semibold w-[140px]">Kode</th>
                  <th className="p-4 font-semibold w-[100px]">Urutan</th>
                  <th className="p-4 font-semibold text-center w-[120px]">Status</th>
                  <th className="p-4 font-semibold text-right w-[100px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-whisper text-xs">
                {!data && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-text-muted">
                      Memuat data...
                    </td>
                  </tr>
                )}
                {subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-surface-container-low/40 transition-colors">
                    <td className="p-4">
                      <div className="font-headline font-bold text-primary truncate">{subject.name}</div>
                      <div className="text-[11px] text-text-muted mt-0.5 truncate" title={subject.description}>{subject.description || '-'}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-surface-container-low px-2 py-0.5 rounded text-[10px] font-bold text-text-primary border border-border-whisper whitespace-nowrap">
                        {subject.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-mono px-2 py-1 bg-surface-container-low rounded-md border border-border-whisper">{subject.code}</span>
                    </td>
                    <td className="p-4 text-text-muted font-mono">{subject.display_order}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(subject)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                          subject.is_active ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' : 'bg-surface-container-high text-text-muted border border-border-whisper hover:bg-gray-200'
                        }`}
                      >
                        {subject.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        <span>{subject.is_active ? 'AKTIF' : 'NONAKTIF'}</span>
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(subject)}
                          className="inline-flex items-center gap-1 rounded-lg p-2 text-primary transition-colors hover:bg-surface-container-high"
                          title="Edit mapel"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(subject.id)}
                          className="inline-flex items-center gap-1 rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                          title="Hapus mapel"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-border-whisper flex items-center justify-between">
              <h3 className="font-headline font-bold text-lg text-primary">
                {editingSubject ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-primary transition-colors">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Nama Mapel <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Contoh: Matematika SD"
                    className="w-full px-3 py-2 border border-border-whisper rounded-xl focus:outline-none focus:border-primary text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Kategori <span className="text-red-500">*</span></label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-border-whisper rounded-xl focus:outline-none focus:border-primary text-sm"
                    >
                      <option value="PAUD/TK">PAUD/TK</option>
                      <option value="SD">SD</option>
                      <option value="SMP">SMP</option>
                      <option value="Semua Jenjang">Semua Jenjang</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Kode Unik <span className="text-red-500">*</span></label>
                    <input
                      required
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      placeholder="Contoh: mtk-sd"
                      className="w-full px-3 py-2 border border-border-whisper rounded-xl focus:outline-none focus:border-primary text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-1.5">Deskripsi Singkat</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Tampil di formulir pemesanan landing page..."
                    className="w-full px-3 py-2 border border-border-whisper rounded-xl focus:outline-none focus:border-primary text-sm min-h-[80px] resize-y"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-1.5">Urutan Tampil (Order)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.display_order}
                      onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-border-whisper rounded-xl focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                        className="w-4 h-4 rounded border-border-whisper text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-text-primary">Status Aktif</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-border-whisper">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary transition-colors"
                >
                  Batal
                </button>
                <Button type="submit" className="px-5 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover">
                  Simpan Mapel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
