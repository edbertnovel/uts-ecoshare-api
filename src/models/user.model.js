const { DataTypes } = require('sequelize');
const koneksiDatabase = require('../config/database');

const Pengguna = koneksiDatabase.define('Pengguna', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  kataSandi: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'kata_sandi',
  },
  peran: {
    type: DataTypes.ENUM('penyewa', 'pemilik'),
    allowNull: false,
  },
}, {
  tableName: 'pengguna',
  underscored: true,
});

module.exports = Pengguna;
