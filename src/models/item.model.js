const { DataTypes } = require('sequelize');
const koneksiDatabase = require('../config/database');
const Pengguna = require('./user.model');

const Barang = koneksiDatabase.define('Barang', {
  pemilikId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'pemilik_id',
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  hargaPerHari: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'harga_per_hari',
  },
  stok: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0,
    },
  },
  status: {
    type: DataTypes.ENUM('tersedia', 'tidak_tersedia'),
    defaultValue: 'tersedia',
  },
}, {
  tableName: 'barang',
  underscored: true,
});

Pengguna.hasMany(Barang, { foreignKey: 'pemilikId' });
Barang.belongsTo(Pengguna, { foreignKey: 'pemilikId', as: 'pemilik' });

module.exports = Barang;
