const layananPeminjaman = require('../services/rental.service');
const { responsBerhasil } = require('../utils/response');

const buatPeminjaman = async (req, res, next) => {
  try {
    const peminjaman = await layananPeminjaman.buatPeminjaman(req.pengguna.id, req.body);
    return responsBerhasil(res, 201, 'Peminjaman berhasil dibuat', peminjaman);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

const kembalikanPeminjaman = async (req, res, next) => {
  try {
    const peminjaman = await layananPeminjaman.kembalikanPeminjaman(req.pengguna.id, req.params.id);
    return responsBerhasil(res, 200, 'Barang berhasil dikembalikan', peminjaman);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

const ambilPeminjamanSaya = async (req, res, next) => {
  try {
    const daftarPeminjaman = await layananPeminjaman.ambilPeminjamanSaya(req.pengguna.id);
    return responsBerhasil(res, 200, 'Riwayat peminjaman berhasil diambil', daftarPeminjaman);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

const ambilRiwayatPeminjamanPemilik = async (req, res, next) => {
  try {
    const daftarPeminjaman = await layananPeminjaman.ambilRiwayatPeminjamanPemilik(req.pengguna.id);
    return responsBerhasil(res, 200, 'Riwayat transaksi barang berhasil diambil', daftarPeminjaman);
  } catch (kesalahan) {
    next(kesalahan);
  }
};

module.exports = { buatPeminjaman, kembalikanPeminjaman, ambilPeminjamanSaya, ambilRiwayatPeminjamanPemilik };
