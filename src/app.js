const express = require('express');
require('dotenv').config();

const koneksiDatabase = require('./config/database');
require('./models/user.model');
require('./models/item.model');
require('./models/rental.model');

const ruteAutentikasi = require('./routes/auth.routes');
const ruteBarang = require('./routes/item.routes');
const rutePeminjaman = require('./routes/rental.routes');
const middlewareKesalahan = require('./middlewares/error.middleware');

const aplikasi = express();

aplikasi.use(express.json());

aplikasi.get('/', (req, res) => {
  res.json({
    berhasil: true,
    pesan: 'Eco-Share API berjalan',
  });
});

aplikasi.use('/api/autentikasi', ruteAutentikasi);
aplikasi.use('/api/barang', ruteBarang);
aplikasi.use('/api/peminjaman', rutePeminjaman);

aplikasi.use((req, res) => {
  res.status(404).json({
    berhasil: false,
    pesan: 'Rute tidak ditemukan',
  });
});

aplikasi.use(middlewareKesalahan);

const PORT = process.env.PORT || 3000;

koneksiDatabase.sync()
  .then(() => {
    console.log('Database berhasil terhubung dan tersinkronisasi');
    aplikasi.listen(PORT, () => {
      console.log(`Server berjalan pada port ${PORT}`);
    });
  })
  .catch((kesalahan) => {
    console.error('Koneksi database gagal:', kesalahan);
  });
