const express = require('express');
const { body } = require('express-validator');
const kontrolerBarang = require('../controllers/item.controller');
const middlewareAutentikasi = require('../middlewares/auth.middleware');
const middlewarePeran = require('../middlewares/role.middleware');
const validasi = require('../middlewares/validation.middleware');

const router = express.Router();

router.get('/', kontrolerBarang.ambilSemuaBarang);

router.post(
  '/',
  middlewareAutentikasi,
  middlewarePeran('pemilik'),
  [
    body('nama').notEmpty().withMessage('Nama barang wajib diisi'),
    body('hargaPerHari').isFloat({ min: 1 }).withMessage('Harga per hari harus lebih dari 0'),
    body('stok').isInt({ min: 0 }).withMessage('Stok minimal 0'),
  ],
  validasi,
  kontrolerBarang.tambahBarang
);

router.get(
  '/barang-saya',
  middlewareAutentikasi,
  middlewarePeran('pemilik'),
  kontrolerBarang.ambilBarangSaya
);

router.put(
  '/:id',
  middlewareAutentikasi,
  middlewarePeran('pemilik'),
  kontrolerBarang.ubahBarang
);

router.delete(
  '/:id',
  middlewareAutentikasi,
  middlewarePeran('pemilik'),
  kontrolerBarang.hapusBarang
);

module.exports = router;
