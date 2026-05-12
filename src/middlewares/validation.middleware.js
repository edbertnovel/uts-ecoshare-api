const { validationResult } = require('express-validator');

const validasi = (req, res, next) => {
  const daftarKesalahan = validationResult(req);

  if (!daftarKesalahan.isEmpty()) {
    return res.status(400).json({
      berhasil: false,
      pesan: 'Validasi gagal',
      kesalahan: daftarKesalahan.array(),
    });
  }

  next();
};

module.exports = validasi;
