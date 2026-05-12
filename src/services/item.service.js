const Barang = require('../models/item.model');

const normalisasiStatus = (stok) => Number(stok) > 0 ? 'tersedia' : 'tidak_tersedia';

const tambahBarang = async (pemilikId, dataMasukan) => {
  return await Barang.create({
    pemilikId,
    nama: dataMasukan.nama,
    deskripsi: dataMasukan.deskripsi,
    hargaPerHari: dataMasukan.hargaPerHari,
    stok: dataMasukan.stok,
    status: normalisasiStatus(dataMasukan.stok),
  });
};

const ambilSemuaBarang = async () => {
  return await Barang.findAll({
    where: { status: 'tersedia' },
    include: [{ association: 'pemilik', attributes: ['id', 'nama', 'email'] }],
  });
};

const ambilBarangSaya = async (pemilikId) => {
  return await Barang.findAll({ where: { pemilikId } });
};

const ubahBarang = async (pemilikId, barangId, dataMasukan) => {
  const barang = await Barang.findOne({ where: { id: barangId, pemilikId } });

  if (!barang) {
    const kesalahan = new Error('Barang tidak ditemukan atau bukan milik Anda');
    kesalahan.kodeStatus = 404;
    throw kesalahan;
  }

  const stok = dataMasukan.stok ?? barang.stok;

  await barang.update({
    nama: dataMasukan.nama ?? barang.nama,
    deskripsi: dataMasukan.deskripsi ?? barang.deskripsi,
    hargaPerHari: dataMasukan.hargaPerHari ?? barang.hargaPerHari,
    stok,
    status: normalisasiStatus(stok),
  });

  return barang;
};

const hapusBarang = async (pemilikId, barangId) => {
  const barang = await Barang.findOne({ where: { id: barangId, pemilikId } });

  if (!barang) {
    const kesalahan = new Error('Barang tidak ditemukan atau bukan milik Anda');
    kesalahan.kodeStatus = 404;
    throw kesalahan;
  }

  await barang.destroy();
  return true;
};

module.exports = { tambahBarang, ambilSemuaBarang, ambilBarangSaya, ubahBarang, hapusBarang };
