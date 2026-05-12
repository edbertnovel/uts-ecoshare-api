const middlewareKesalahan = (kesalahan, req, res, next) => {
  console.error(kesalahan);

  const kodeStatus = kesalahan.kodeStatus || 500;

  return res.status(kodeStatus).json({
    berhasil: false,
    pesan: kesalahan.message || 'Terjadi kesalahan pada server',
  });
};

module.exports = middlewareKesalahan;
