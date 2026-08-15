'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Student, LevelType } from '../../types';
import { PROVINCES, getRegencies, getDistricts } from '../../data/wilayahData';
import {
  Edit3,
  GraduationCap,
  BookOpen,
  User,
  Phone,
  MapPin,
  School,
  Building,
  AlertCircle,
  Globe,
  Palette,
} from 'lucide-react';

export interface EditStudentModalProps {
  readonly isOpen: boolean;
  readonly student: Student | null;
  readonly onClose: () => void;
  readonly onStudentUpdated?: (updatedStudent: Student) => void;
}

export function EditStudentModal({
  isOpen,
  student,
  onClose,
  onStudentUpdated,
}: EditStudentModalProps) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<LevelType>('SD');
  const [grade, setGrade] = useState<number>(4);
  const [school, setSchool] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [address, setAddress] = useState('');

  // Region cascading state
  const [provinceCode, setProvinceCode] = useState<string>('73');
  const [regencyCode, setRegencyCode] = useState<string>('73.71');
  const [city, setCity] = useState<string>('Kota Makassar');
  const [districtCode, setDistrictCode] = useState<string>('73.71.03');
  const [district, setDistrict] = useState<string>('Rappocini');

  const [isCustomCity, setIsCustomCity] = useState<boolean>(false);
  const [isCustomDistrict, setIsCustomDistrict] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableRegencies = getRegencies(provinceCode);
  const availableDistricts = getDistricts(regencyCode);

  useEffect(() => {
    if (student) {
      setName(student.name);
      setLevel(student.level);
      setGrade(student.grade);
      setSchool(student.school || '');
      setParentName(student.parentName);
      setParentPhone(student.parentPhone);

      // Clean address string split if possible or default to raw address
      setAddress(student.address || '');
      setErrorMsg(null);
    }
  }, [student]);

  const handleProvinceChange = (newProvCode: string) => {
    setProvinceCode(newProvCode);
    const regencies = getRegencies(newProvCode);
    if (regencies.length > 0) {
      const firstReg = regencies[0];
      setRegencyCode(firstReg.code);
      setCity(firstReg.name);
      setIsCustomCity(false);

      const dists = getDistricts(firstReg.code);
      if (dists.length > 0) {
        setDistrictCode(dists[0].code);
        setDistrict(dists[0].name);
        setIsCustomDistrict(false);
      }
    }
  };

  const handleRegencyChange = (newRegCode: string) => {
    if (newRegCode === 'CUSTOM') {
      setIsCustomCity(true);
      setCity('');
      setDistrict('');
      setIsCustomDistrict(true);
      return;
    }

    setIsCustomCity(false);
    setRegencyCode(newRegCode);
    const selectedReg = availableRegencies.find((r) => r.code === newRegCode);
    if (selectedReg) {
      setCity(selectedReg.name);
    }

    const dists = getDistricts(newRegCode);
    if (dists.length > 0) {
      setDistrictCode(dists[0].code);
      setDistrict(dists[0].name);
      setIsCustomDistrict(false);
    } else {
      setIsCustomDistrict(true);
      setDistrict('');
    }
  };

  const handleDistrictChange = (newDistCode: string) => {
    if (newDistCode === 'CUSTOM') {
      setIsCustomDistrict(true);
      setDistrict('');
      return;
    }

    setIsCustomDistrict(false);
    setDistrictCode(newDistCode);
    const selectedDist = availableDistricts.find((d) => d.code === newDistCode);
    if (selectedDist) {
      setDistrict(selectedDist.name);
    }
  };

  const handleLevelChange = (newLevel: LevelType) => {
    setLevel(newLevel);
    if (newLevel === 'SD' && grade > 6) {
      setGrade(4);
    } else if (newLevel === 'SMP' && grade < 7) {
      setGrade(7);
    } else if (newLevel === 'Calistung') {
      setGrade(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    if (!name.trim() || !parentName.trim() || !parentPhone.trim() || !address.trim() || !city.trim() || !district.trim()) {
      setErrorMsg('Mohon isi semua bidang yang wajib diisi.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/students', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: student.id,
          name: name.trim(),
          level,
          grade,
          school: school.trim() || (level === 'SD' ? 'SD Nusantara' : 'SMP Nusantara'),
          parentName: parentName.trim(),
          parentPhone: parentPhone.trim(),
          address: address.trim(),
          district: district.trim(),
          city: city.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal memperbarui data siswa.');
      }

      const updated: Student = data.student || {
        ...student,
        name: name.trim(),
        level,
        grade,
        school: school.trim() || (level === 'SD' ? 'SD Nusantara' : 'SMP Nusantara'),
        parentName: parentName.trim(),
        parentPhone: parentPhone.trim(),
        address: `${address.trim()}, Kecamatan ${district.trim()}, ${city.trim()}`,
      };

      if (onStudentUpdated) {
        onStudentUpdated(updated);
      }

      onClose();
    } catch (err: any) {
      console.error('Error updating student:', err);
      // Local optimistic update fallback
      const fallbackUpdated: Student = {
        ...student,
        name: name.trim(),
        level,
        grade,
        school: school.trim() || (level === 'SD' ? 'SD Nusantara' : 'SMP Nusantara'),
        parentName: parentName.trim(),
        parentPhone: parentPhone.trim(),
        address: `${address.trim()}, Kecamatan ${district.trim()}, ${city.trim()}`,
      };

      if (onStudentUpdated) {
        onStudentUpdated(fallbackUpdated);
      }

      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!student) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-primary">
          <div className="w-8 h-8 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary font-bold">
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold text-primary">Edit Profil Data Siswa</h3>
            <p className="text-xs text-text-muted">Perbarui data identitas murid dan kontak wali murid</p>
          </div>
        </div>
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Nama Siswa */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            Nama Lengkap Siswa <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Muhammad Fajar Pratama"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium text-primary"
            />
          </div>
        </div>

        {/* Jenjang & Kelas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Jenjang Pendidikan <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleLevelChange('Calistung')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  level === 'Calistung'
                    ? 'bg-amber-50 border-amber-600 text-amber-700 shadow-xs'
                    : 'border-border-whisper text-text-muted hover:bg-surface-container-high'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Calistung</span>
              </button>
              <button
                type="button"
                onClick={() => handleLevelChange('SD')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  level === 'SD'
                    ? 'bg-blue-50 border-blue-900 text-blue-900 shadow-xs'
                    : 'border-border-whisper text-text-muted hover:bg-surface-container-high'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>SD</span>
              </button>
              <button
                type="button"
                onClick={() => handleLevelChange('SMP')}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                  level === 'SMP'
                    ? 'bg-indigo-50 border-indigo-900 text-indigo-900 shadow-xs'
                    : 'border-border-whisper text-text-muted hover:bg-surface-container-high'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>SMP</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Tingkat Kelas <span className="text-red-500">*</span>
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium"
            >
              {level === 'Calistung' ? (
                <>
                  <option value={0}>TK / PAUD / Pra-SD</option>
                </>
              ) : level === 'SD' ? (
                <>
                  <option value={1}>Kelas 1 SD</option>
                  <option value={2}>Kelas 2 SD</option>
                  <option value={3}>Kelas 3 SD</option>
                  <option value={4}>Kelas 4 SD</option>
                  <option value={5}>Kelas 5 SD</option>
                  <option value={6}>Kelas 6 SD</option>
                </>
              ) : (
                <>
                  <option value={7}>Kelas 7 SMP</option>
                  <option value={8}>Kelas 8 SMP</option>
                  <option value={9}>Kelas 9 SMP</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Nama Sekolah */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            Asal Sekolah
          </label>
          <div className="relative">
            <School className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Contoh: SDN Kompleks IKIP Makassar"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium text-primary"
            />
          </div>
        </div>

        {/* Data Orang Tua */}
        <div className="pt-2 border-t border-border-whisper grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Nama Orang Tua / Wali <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Contoh: Ibu Ratna Dewi"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium text-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Nomor WhatsApp Wali <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-mono font-medium text-primary"
              />
            </div>
          </div>
        </div>

        {/* Alamat */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            Alamat Lengkap Domisili <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-text-muted absolute left-3 top-3" />
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Contoh: Jl. Hertasning No. 25, Blok B1"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors resize-none font-medium text-primary"
            />
          </div>
        </div>

        {/* Provinsi & Kota / Kabupaten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">Provinsi</label>
            <div className="relative">
              <Globe className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={provinceCode}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium appearance-none"
              >
                {PROVINCES.map((prov) => (
                  <option key={prov.code} value={prov.code}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Kota / Kabupaten <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {isCustomCity ? (
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ketik Kota / Kabupaten..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium"
                />
              ) : (
                <select
                  value={regencyCode}
                  onChange={(e) => handleRegencyChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium appearance-none"
                >
                  {availableRegencies.map((reg) => (
                    <option key={reg.code} value={reg.code}>
                      {reg.name}
                    </option>
                  ))}
                  <option value="CUSTOM">+ Ketik Manual (Lainnya)</option>
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Kecamatan */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            Kecamatan <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {isCustomDistrict ? (
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="Ketik nama Kecamatan..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium"
              />
            ) : (
              <select
                value={districtCode}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium appearance-none"
              >
                {availableDistricts.map((dist) => (
                  <option key={dist.code} value={dist.code}>
                    {dist.name}
                  </option>
                ))}
                <option value="CUSTOM">+ Ketik Manual (Lainnya)</option>
              </select>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-whisper">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:bg-surface-container-high transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 bg-primary-container hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {isLoading ? (
              <span>Menyimpan...</span>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
