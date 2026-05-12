const { DataTypes } = require('sequelize');
const koneksiDatabase = require('../config/database');
const Pengguna = require('./user.model');
const Barang = require('./item.model');

const Peminjaman = koneksiDatabase.define('Peminjaman', {
  barangId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'barang_id',
  },
  penyewaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'penyewa_id',
  },
  tanggalMulai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'tanggal_mulai',
  },
  tanggalSelesai: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'tanggal_selesai',
  },
  totalHari: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'total_hari',
  },
  totalHarga: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_harga',
  },
  status: {
    type: DataTypes.ENUM('menunggu', 'disetujui', 'dikembalikan', 'dibatalkan'),
    defaultValue: 'menunggu',
  },
}, {
  tableName: 'peminjaman',
  underscored: true,
});

Pengguna.hasMany(Peminjaman, { foreignKey: 'penyewaId' });
Peminjaman.belongsTo(Pengguna, { foreignKey: 'penyewaId', as: 'penyewa' });

Barang.hasMany(Peminjaman, { foreignKey: 'barangId' });
Peminjaman.belongsTo(Barang, { foreignKey: 'barangId', as: 'barang' });

module.exports = Peminjaman;
