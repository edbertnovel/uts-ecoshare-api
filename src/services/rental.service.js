const koneksiDatabase = require('../config/database');
const Barang = require('../models/item.model');
const Peminjaman = require('../models/rental.model');
const Pengguna = require('../models/user.model');

const hitungHari = (tanggalMulai, tanggalSelesai) => {
  const mulai = new Date(tanggalMulai);
  const selesai = new Date(tanggalSelesai);
  const selisihWaktu = selesai - mulai;
  const jumlahHari = selisihWaktu / (1000 * 60 * 60 * 24);

  if (Number.isNaN(jumlahHari) || jumlahHari <= 0) {
    const kesalahan = new Error('Tanggal selesai harus lebih besar dari tanggal mulai');
    kesalahan.kodeStatus = 400;
    throw kesalahan;
  }

  return jumlahHari;
};

const buatPeminjaman = async (penyewaId, dataMasukan) => {
  const transaksi = await koneksiDatabase.transaction();

  try {
    const barang = await Barang.findOne({
      where: { id: dataMasukan.barangId },
      lock: transaksi.LOCK.UPDATE,
      transaction: transaksi,
    });

    if (!barang) {
      const kesalahan = new Error('Barang tidak ditemukan');
      kesalahan.kodeStatus = 404;
      throw kesalahan;
    }

    if (barang.stok <= 0 || barang.status !== 'tersedia') {
      const kesalahan = new Error('Stok barang tidak tersedia');
      kesalahan.kodeStatus = 400;
      throw kesalahan;
    }

    if (barang.pemilikId === penyewaId) {
      const kesalahan = new Error('Pemilik tidak dapat menyewa barang miliknya sendiri');
      kesalahan.kodeStatus = 400;
      throw kesalahan;
    }

    const totalHari = hitungHari(dataMasukan.tanggalMulai, dataMasukan.tanggalSelesai);
    const totalHarga = totalHari * Number(barang.hargaPerHari);

    const peminjaman = await Peminjaman.create({
      barangId: barang.id,
      penyewaId,
      tanggalMulai: dataMasukan.tanggalMulai,
      tanggalSelesai: dataMasukan.tanggalSelesai,
      totalHari,
      totalHarga,
      status: 'disetujui',
    }, { transaction: transaksi });

    const stokBaru = barang.stok - 1;

    await barang.update({
      stok: stokBaru,
      status: stokBaru > 0 ? 'tersedia' : 'tidak_tersedia',
    }, { transaction: transaksi });

    await transaksi.commit();
    return peminjaman;
  } catch (kesalahan) {
    await transaksi.rollback();
    throw kesalahan;
  }
};

const kembalikanPeminjaman = async (penyewaId, peminjamanId) => {
  const transaksi = await koneksiDatabase.transaction();

  try {
    const peminjaman = await Peminjaman.findOne({
      where: { id: peminjamanId, penyewaId },
      transaction: transaksi,
    });

    if (!peminjaman) {
      const kesalahan = new Error('Data peminjaman tidak ditemukan');
      kesalahan.kodeStatus = 404;
      throw kesalahan;
    }

    if (peminjaman.status === 'dikembalikan') {
      const kesalahan = new Error('Barang sudah dikembalikan');
      kesalahan.kodeStatus = 400;
      throw kesalahan;
    }

    const barang = await Barang.findOne({
      where: { id: peminjaman.barangId },
      lock: transaksi.LOCK.UPDATE,
      transaction: transaksi,
    });

    await peminjaman.update({ status: 'dikembalikan' }, { transaction: transaksi });

    const stokBaru = barang.stok + 1;
    await barang.update({ stok: stokBaru, status: 'tersedia' }, { transaction: transaksi });

    await transaksi.commit();
    return peminjaman;
  } catch (kesalahan) {
    await transaksi.rollback();
    throw kesalahan;
  }
};

const ambilPeminjamanSaya = async (penyewaId) => {
  return await Peminjaman.findAll({
    where: { penyewaId },
    include: [{ model: Barang, as: 'barang' }],
    order: [['createdAt', 'DESC']],
  });
};

const ambilRiwayatPeminjamanPemilik = async (pemilikId) => {
  return await Peminjaman.findAll({
    include: [
      {
        model: Barang,
        as: 'barang',
        where: { pemilikId },
      },
      {
        model: Pengguna,
        as: 'penyewa',
        attributes: ['id', 'nama', 'email'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
};

module.exports = { buatPeminjaman, kembalikanPeminjaman, ambilPeminjamanSaya, ambilRiwayatPeminjamanPemilik };
