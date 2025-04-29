# 📦 Supplier Management App

Sebuah aplikasi berbasis ReactJS untuk mengelola data Supplier, Kriteria, dan Penilaian secara dinamis. 
Project ini menggunakan data awal berbentuk JSON dan menyediakan fitur CRUD (Create, Read, Update, Delete).

## 🚀 Tech Stack

- [ReactJS](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [JSON Data](https://www.json.org/)

## 📂 Struktur Data

- **Alternatif (Supplier)**: Daftar supplier yang menjadi kandidat pilihan.
- **Kriteria**: Parameter penilaian seperti harga, kualitas, dan waktu pengiriman.
- **Penilaian**: Nilai untuk masing-masing alternatif terhadap kriteria.

```json
{
  "alternatif": [
    { "id": "A1", "nama": "Supplier A" },
    { "id": "A2", "nama": "Supplier B" },
    { "id": "A3", "nama": "Supplier C" }
  ],
  "kriteria": [
    { "id": "C1", "nama": "Harga", "bobot": 0.4, "tipe": "cost" },
    { "id": "C2", "nama": "Kualitas", "bobot": 0.3, "tipe": "benefit" },
    { "id": "C3", "nama": "Waktu Pengiriman", "bobot": 0.3, "tipe": "benefit" }
  ],
  "penilaian": [
    { "alternatifId": "A1", "nilai": { "C1": 10000, "C2": 8, "C3": 2 } },
    { "alternatifId": "A2", "nilai": { "C1": 9000, "C2": 6, "C3": 3 } },
    { "alternatifId": "A3", "nilai": { "C1": 9500, "C2": 7, "C3": 1 } }
  ]
}
