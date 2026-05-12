const express = require('express');
const { body } = require('express-validator');
const kontrolerPeminjaman = require('../controllers/rental.controller');
const middlewareAutentikasi = require('../middlewares/auth.middleware');
const middlewarePeran = require('../middlewares/role.middleware');
const validasi = require('../middlewares/validation.middleware');

const router = express.Router();

router.post(
  '/',
  middlewareAutentikasi,
  middlewarePeran('penyewa'),
  [
    body('barangId').isInt({ min: 1 }).withMessage('ID barang tidak valid'),
    body('tanggalMulai').isISO8601().withMessage('Tanggal mulai tidak valid'),
    body('tanggalSelesai').isISO8601().withMessage('Tanggal selesai tidak valid'),
  ],
  validasi,
  kontrolerPeminjaman.buatPeminjaman
);

router.get(
  '/peminjaman-saya',
  middlewareAutentikasi,
  middlewarePeran('penyewa'),
  kontrolerPeminjaman.ambilPeminjamanSaya
);

router.patch(
  '/:id/kembalikan',
  middlewareAutentikasi,
  middlewarePeran('penyewa'),
  kontrolerPeminjaman.kembalikanPeminjaman
);

router.get(
  '/pemilik/riwayat',
  middlewareAutentikasi,
  middlewarePeran('pemilik'),
  kontrolerPeminjaman.ambilRiwayatPeminjamanPemilik
);

module.exports = router;
