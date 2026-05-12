const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Pengguna = require('../models/user.model');

const daftar = async ({ nama, email, kataSandi, peran }) => {
  const penggunaSudahAda = await Pengguna.findOne({ where: { email } });

  if (penggunaSudahAda) {
    const kesalahan = new Error('Email sudah terdaftar');
    kesalahan.kodeStatus = 400;
    throw kesalahan;
  }

  const kataSandiTerenkripsi = await bcrypt.hash(kataSandi, 10);

  const pengguna = await Pengguna.create({
    nama,
    email,
    kataSandi: kataSandiTerenkripsi,
    peran,
  });

  return {
    id: pengguna.id,
    nama: pengguna.nama,
    email: pengguna.email,
    peran: pengguna.peran,
  };
};

const masuk = async ({ email, kataSandi }) => {
  const pengguna = await Pengguna.findOne({ where: { email } });

  if (!pengguna) {
    const kesalahan = new Error('Email atau kata sandi salah');
    kesalahan.kodeStatus = 401;
    throw kesalahan;
  }

  const kataSandiValid = await bcrypt.compare(kataSandi, pengguna.kataSandi);

  if (!kataSandiValid) {
    const kesalahan = new Error('Email atau kata sandi salah');
    kesalahan.kodeStatus = 401;
    throw kesalahan;
  }

  const token = jwt.sign(
    {
      id: pengguna.id,
      email: pengguna.email,
      peran: pengguna.peran,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    pengguna: {
      id: pengguna.id,
      nama: pengguna.nama,
      email: pengguna.email,
      peran: pengguna.peran,
    },
  };
};

module.exports = { daftar, masuk };
