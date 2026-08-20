'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
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
    <div className="min-h-screen bg-surface-container-lowest flex flex-col">
      <TopNavBar />
      
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-headline font-bold text-primary">Kelola Mata Pelajaran</h1>
            <p className="text-text-muted mt-1">Atur daftar mata pelajaran yang tersedia di formulir pendaftaran dan booking.</p>
          </div>
          <Button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors">
            <Plus className="w-4 h-4" />
            <span>Tambah Mapel</span>
          </Button>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6">Gagal memuat data.</div>}

        <div className="bg-white rounded-2xl border border-border-whisper shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-border-whisper text-sm text-text-muted">
                  <th className="px-6 py-4 font-semibold">Nama Mapel</th>
                  <th className="px-6 py-4 font-semibold">Kategori</th>
                  <th className="px-6 py-4 font-semibold">Kode</th>
                  <th className="px-6 py-4 font-semibold">Urutan</th>
                  <th className="px-6 py-4 font-semibold text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {!data && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                      Memuat data...
                    </td>
                  </tr>
                )}
                {subjects.map((subject) => (
                  <tr key={subject.id} className="border-b border-border-whisper last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary">{subject.name}</div>
                      <div className="text-xs text-text-muted mt-0.5 line-clamp-1" title={subject.description}>{subject.description || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-surface-container-low px-2 py-1 rounded-md text-xs font-medium text-text-primary">
                        {subject.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-xs">{subject.code}</code>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{subject.display_order}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(subject)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          subject.is_active ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {subject.is_active ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {subject.is_active ? 'Aktif' : 'Nonaktif'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(subject)}
                          className="p-1.5 text-text-muted hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(subject.id)}
                          className="p-1.5 text-text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
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
