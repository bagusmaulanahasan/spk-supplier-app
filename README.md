# SPK Supplier Terbaik - Metode Simple Additive Weighting

Aplikasi web ini merupakan Sistem Penunjang Keputusan (SPK) menggunakan metode SAW (Simple Additive Weighting) untuk menentukan supplier terbaik di CV xyz, sebuah perusahaan yang bergerak di bidang supplier aksesoris hotel.

## 🛠 Tech Stack

- **Frontend**: ReactJS, TailwindCSS, SweetAlert, ShadCN
- **Backend**: ExpressJS (Node.js)
- **Database**: MySQL

## 👥 Role Pengguna

1. **Admin**
2. **Kepala Bagian**

## 🧭 Menu & Fitur

### Untuk Admin & Kepala Bagian
- **Dashboard**: Visualisasi dan informasi ringkas hasil penilaian
- **Data Alternatif**: Data calon supplier
- **Data Kriteria**: Kriteria penilaian supplier
- **Penilaian Kriteria**: Bobot tiap kriteria
- **Penilaian Alternatif**: Nilai masing-masing supplier berdasarkan kriteria
- **Data Hasil Keputusan**: Hasil akhir perhitungan metode SAW

### Tambahan untuk Kepala Bagian
- **Data Pengguna**: Manajemen akun pengguna sistem

## 📦 Instalasi Lokal

```bash
git clone https://github.com/bagusmaulanahasan/spk-supplier-app.git
cd spk-supplier-app

# Install dependencies untuk client
cd client
npm install

# Jalankan client
npm run dev

# Install dependencies untuk server
cd ../server
npm install

# Jalankan server
node app
```
