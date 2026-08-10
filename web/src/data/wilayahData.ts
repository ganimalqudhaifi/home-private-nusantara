export interface RegionItem {
  readonly code: string;
  readonly name: string;
}

export const PROVINCES: readonly RegionItem[] = [
  { code: '73', name: 'Sulawesi Selatan' },
  { code: '31', name: 'DKI Jakarta' },
  { code: '32', name: 'Jawa Barat' },
  { code: '33', name: 'Jawa Tengah' },
  { code: '35', name: 'Jawa Timur' },
  { code: '36', name: 'Banten' },
  { code: '51', name: 'Bali' },
  { code: '12', name: 'Sumatera Utara' },
  { code: '13', name: 'Sumatera Barat' },
  { code: '14', name: 'Riau' },
  { code: '71', name: 'Sulawesi Utara' },
  { code: '72', name: 'Sulawesi Tengah' },
  { code: '74', name: 'Sulawesi Tenggara' },
  { code: '75', name: 'Gorontalo' },
  { code: '76', name: 'Sulawesi Barat' },
];

export const REGENCIES: Record<string, readonly RegionItem[]> = {
  // Sulawesi Selatan (73)
  '73': [
    { code: '73.71', name: 'Kota Makassar' },
    { code: '73.06', name: 'Kabupaten Gowa' },
    { code: '73.09', name: 'Kabupaten Maros' },
    { code: '73.05', name: 'Kabupaten Takalar' },
    { code: '73.72', name: 'Kota Parepare' },
    { code: '73.73', name: 'Kota Palopo' },
    { code: '73.08', name: 'Kabupaten Bone' },
    { code: '73.02', name: 'Kabupaten Bulukumba' },
    { code: '73.04', name: 'Kabupaten Jeneponto' },
    { code: '73.03', name: 'Kabupaten Bantaeng' },
    { code: '73.10', name: 'Kabupaten Pangkajene Dan Kepulauan' },
    { code: '73.11', name: 'Kabupaten Barru' },
    { code: '73.12', name: 'Kabupaten Soppeng' },
    { code: '73.13', name: 'Kabupaten Wajo' },
    { code: '73.14', name: 'Kabupaten Sidenreng Rappang' },
    { code: '73.15', name: 'Kabupaten Pinrang' },
    { code: '73.16', name: 'Kabupaten Enrekang' },
    { code: '73.17', name: 'Kabupaten Luwu' },
    { code: '73.18', name: 'Kabupaten Tana Toraja' },
    { code: '73.22', name: 'Kabupaten Luwu Utara' },
    { code: '73.25', name: 'Kabupaten Luwu Timur' },
    { code: '73.26', name: 'Kabupaten Toraja Utara' },
    { code: '73.01', name: 'Kabupaten Kepulauan Selayar' },
    { code: '73.07', name: 'Kabupaten Sinjai' },
  ],
  // DKI Jakarta (31)
  '31': [
    { code: '31.71', name: 'Kota Administrasi Jakarta Pusat' },
    { code: '31.74', name: 'Kota Administrasi Jakarta Selatan' },
    { code: '31.73', name: 'Kota Administrasi Jakarta Barat' },
    { code: '31.75', name: 'Kota Administrasi Jakarta Timur' },
    { code: '31.72', name: 'Kota Administrasi Jakarta Utara' },
  ],
  // Jawa Barat (32)
  '32': [
    { code: '32.73', name: 'Kota Bandung' },
    { code: '32.75', name: 'Kota Bekasi' },
    { code: '32.76', name: 'Kota Depok' },
    { code: '32.71', name: 'Kota Bogor' },
  ],
  // Jawa Timur (35)
  '35': [
    { code: '35.78', name: 'Kota Surabaya' },
    { code: '35.73', name: 'Kota Malang' },
  ],
};

export const DISTRICTS: Record<string, readonly RegionItem[]> = {
  // Kota Makassar (73.71)
  '73.71': [
    { code: '73.71.03', name: 'Rappocini' },
    { code: '73.71.04', name: 'Panakkukang' },
    { code: '73.71.11', name: 'Tamalanrea' },
    { code: '73.71.01', name: 'Mariso' },
    { code: '73.71.02', name: 'Mamajang' },
    { code: '73.71.05', name: 'Makassar' },
    { code: '73.71.06', name: 'Ujung Pandang' },
    { code: '73.71.07', name: 'Wajo' },
    { code: '73.71.08', name: 'Bontoala' },
    { code: '73.71.09', name: 'Tallo' },
    { code: '73.71.10', name: 'Ujung Tanah' },
    { code: '73.71.12', name: 'Biringkanaya' },
    { code: '73.71.13', name: 'Manggala' },
    { code: '73.71.14', name: 'Tamalate' },
    { code: '73.71.15', name: 'Sangkarrang' },
  ],
  // Kabupaten Gowa (73.06)
  '73.06': [
    { code: '73.06.01', name: 'Somba Opu' },
    { code: '73.06.02', name: 'Bontomarannu' },
    { code: '73.06.03', name: 'Pallangga' },
    { code: '73.06.04', name: 'Bajeng' },
    { code: '73.06.05', name: 'Pattallassang' },
    { code: '73.06.06', name: 'Barombong' },
    { code: '73.06.07', name: 'Tinggimoncong' },
    { code: '73.06.08', name: 'Parangloe' },
    { code: '73.06.09', name: 'Bontolempangan' },
  ],
  // Kabupaten Maros (73.09)
  '73.09': [
    { code: '73.09.01', name: 'Mandai' },
    { code: '73.09.02', name: 'Turikale' },
    { code: '73.09.03', name: 'Maros Baru' },
    { code: '73.09.04', name: 'Bentoena' },
    { code: '73.09.05', name: 'Moncongloe' },
    { code: '73.09.06', name: 'Bantimurung' },
    { code: '73.09.07', name: 'Simbang' },
    { code: '73.09.08', name: 'Cenrana' },
  ],
  // Kabupaten Takalar (73.05)
  '73.05': [
    { code: '73.05.01', name: 'Pattallassang' },
    { code: '73.05.02', name: 'Polombangkeng Selatan' },
    { code: '73.05.03', name: 'Polombangkeng Utara' },
    { code: '73.05.04', name: 'Galesong' },
    { code: '73.05.05', name: 'Galesong Selatan' },
    { code: '73.05.06', name: 'Galesong Utara' },
    { code: '73.05.07', name: 'Mangarabombang' },
  ],
  // Kota Parepare (73.72)
  '73.72': [
    { code: '73.72.01', name: 'Bacukiki' },
    { code: '73.72.02', name: 'Ujung' },
    { code: '73.72.03', name: 'Soreang' },
    { code: '73.72.04', name: 'Bacukiki Barat' },
  ],
  // Kota Palopo (73.73)
  '73.73': [
    { code: '73.73.01', name: 'Wara' },
    { code: '73.73.02', name: 'Wara Utara' },
    { code: '73.73.03', name: 'Wara Selatan' },
    { code: '73.73.04', name: 'Telluwanua' },
    { code: '73.73.05', name: 'Wara Timur' },
    { code: '73.73.06', name: 'Wara Barat' },
  ],
  // Kota Administrasi Jakarta Selatan (31.74)
  '31.74': [
    { code: '31.74.06', name: 'Cilandak' },
    { code: '31.74.09', name: 'Jagakarsa' },
    { code: '31.74.01', name: 'Tebet' },
    { code: '31.74.02', name: 'Setiabudi' },
    { code: '31.74.03', name: 'Mampang Prapatan' },
    { code: '31.74.04', name: 'Pasar Minggu' },
    { code: '31.74.05', name: 'Kebayoran Lama' },
    { code: '31.74.07', name: 'Kebayoran Baru' },
    { code: '31.74.08', name: 'Pancoran' },
    { code: '31.74.10', name: 'Pesanggrahan' },
  ],
  // Kota Bandung (32.73)
  '32.73': [
    { code: '32.73.01', name: 'Coblong' },
    { code: '32.73.02', name: 'Cicendo' },
    { code: '32.73.03', name: 'Sukajadi' },
    { code: '32.73.04', name: 'Sumur Bandung' },
  ],
  // Kota Surabaya (35.78)
  '35.78': [
    { code: '35.78.01', name: 'Tegalsari' },
    { code: '35.78.02', name: 'Gubeng' },
    { code: '35.78.03', name: 'Wonokromo' },
    { code: '35.78.04', name: 'Genteng' },
  ],
};

export function getProvinces(): readonly RegionItem[] {
  return PROVINCES;
}

export function getRegencies(provinceCode: string): readonly RegionItem[] {
  return REGENCIES[provinceCode] || [
    { code: 'custom-regency-1', name: 'Kota Makassar' },
    { code: 'custom-regency-2', name: 'Kabupaten Gowa' },
  ];
}

export function getDistricts(regencyCode: string): readonly RegionItem[] {
  return DISTRICTS[regencyCode] || [
    { code: 'custom-dist-1', name: 'Rappocini' },
    { code: 'custom-dist-2', name: 'Panakkukang' },
    { code: 'custom-dist-3', name: 'Tamalanrea' },
    { code: 'custom-dist-4', name: 'Somba Opu' },
  ];
}
