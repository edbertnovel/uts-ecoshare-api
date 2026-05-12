const layananBarang = require('../services/item.service');
const { responsBerhasil } = require('../utils/response');

const tambahBarang = async (req, res, next) => {
  try {
    const barang = await layananBarang.tambahBarang(req.pengguna.id, req.body);
    return responsBerhasil(res, 201, 'Barang berhasil ditambahkan', barang);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

const ambilSemuaBarang = async (req, res, next) => {
  try {
    const daftarBarang = await layananBarang.ambilSemuaBarang();
    return responsBerhasil(res, 200, 'Data barang berhasil diambil', daftarBarang);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

const ambilBarangSaya = async (req, res, next) => {
  try {
    const daftarBarang = await layananBarang.ambilBarangSaya(req.pengguna.id);
    return responsBerhasil(res, 200, 'Data barang milik Anda berhasil diambil', daftarBarang);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

const ubahBarang = async (req, res, next) => {
  try {
    const barang = await layananBarang.ubahBarang(req.pengguna.id, req.params.id, req.body);
    return responsBerhasil(res, 200, 'Barang berhasil diperbarui', barang);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

const hapusBarang = async (req, res, next) => {
  try {
    await layananBarang.hapusBarang(req.pengguna.id, req.params.id);
    return responsBerhasil(res, 200, 'Barang berhasil dihapus');
  } catch (kesalahan) {
    next(kesalahan);
  }
};

module.exports = { tambahBarang, ambilSemuaBarang, ambilBarangSaya, ubahBarang, hapusBarang };
