const layananAutentikasi = require('../services/auth.service');
const { responsBerhasil } = require('../utils/response');

const daftar = async (req, res, next) => {
  try {
    const pengguna = await layananAutentikasi.daftar(req.body);
    return responsBerhasil(res, 201, 'Registrasi berhasil', pengguna);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

const masuk = async (req, res, next) => {
  try {
    const hasil = await layananAutentikasi.masuk(req.body);
    return responsBerhasil(res, 200, 'Login berhasil', hasil);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

module.exports = { daftar, masuk };
