# Eco-Share API

Backend API untuk platform penyewaan alat elektronik bekas menggunakan NodeJS dan MySQL.

## Fitur

- Daftar dan masuk pengguna
- Autentikasi JWT stateless
- Guard peran untuk `penyewa` dan `pemilik`
- CRUD barang untuk pemilik
- Peminjaman barang untuk penyewa
- Pengecekan stok otomatis
- Perhitungan total hari dan total harga
- Riwayat transaksi peminjaman
- Pengembalian barang
- Penanganan kesalahan global
- Database transaction dan row locking
- Environment variable

## Instalasi

```bash
npm install
cp .env.example .env
```

Buat database MySQL:

```sql
CREATE DATABASE eco_share_db;
```

Jalankan aplikasi:

```bash
npm run dev
```

## Endpoint

| Method | Endpoint | Peran | Fungsi |
|---|---|---|---|
| POST | `/api/autentikasi/daftar` | Public | Registrasi pengguna |
| POST | `/api/autentikasi/masuk` | Public | Login pengguna |
| GET | `/api/barang` | Public | Melihat barang tersedia |
| POST | `/api/barang` | Pemilik | Menambah barang |
| GET | `/api/barang/barang-saya` | Pemilik | Melihat barang milik sendiri |
| PUT | `/api/barang/:id` | Pemilik | Mengubah barang |
| DELETE | `/api/barang/:id` | Pemilik | Menghapus barang |
| POST | `/api/peminjaman` | Penyewa | Membuat peminjaman |
| GET | `/api/peminjaman/peminjaman-saya` | Penyewa | Melihat riwayat peminjaman |
| PATCH | `/api/peminjaman/:id/kembalikan` | Penyewa | Mengembalikan barang |
| GET | `/api/peminjaman/pemilik/riwayat` | Pemilik | Melihat transaksi barang miliknya |

## Contoh Body JSON

### Daftar Penyewa

```json
{
  "nama": "Andi Penyewa",
  "email": "andi@mail.com",
  "kataSandi": "123456",
  "peran": "penyewa"
}
```

### Daftar Pemilik

```json
{
  "nama": "Budi Pemilik",
  "email": "budi@mail.com",
  "kataSandi": "123456",
  "peran": "pemilik"
}
```

### Masuk

```json
{
  "email": "budi@mail.com",
  "kataSandi": "123456"
}
```

### Tambah Barang

```json
{
  "nama": "Kamera Canon Bekas",
  "deskripsi": "Kamera bekas kondisi bagus untuk disewa",
  "hargaPerHari": 50000,
  "stok": 3
}
```

### Buat Peminjaman

```json
{
  "barangId": 1,
  "tanggalMulai": "2026-05-12",
  "tanggalSelesai": "2026-05-15"
}
```

## Contoh Git Workflow

```bash
git init
git add .
git commit -m "chore: initial project setup"

git add .
git commit -m "feat: implement autentikasi jwt"

git add .
git commit -m "feat: add layanan barang dan peminjaman"
```
