const express = require('express');
const { body } = require('express-validator');
const kontrolerAutentikasi = require('../controllers/auth.controller');
const validasi = require('../middlewares/validation.middleware');

const router = express.Router();

router.post(
  '/daftar',
  [
    body('nama').notEmpty().withMessage('Nama wajib diisi'),
    body('email').isEmail().withMessage('Email tidak valid'),
    body('kataSandi').isLength({ min: 6 }).withMessage('Kata sandi minimal 6 karakter'),
    body('peran').isIn(['penyewa', 'pemilik']).withMessage('Peran harus penyewa atau pemilik'),
  ],
  validasi,
  kontrolerAutentikasi.daftar
);

router.post(
  '/masuk',
  [
    body('email').isEmail().withMessage('Email tidak valid'),
    body('kataSandi').notEmpty().withMessage('Kata sandi wajib diisi'),
  ],
  validasi,
  kontrolerAutentikasi.masuk
);

module.exports = router;
