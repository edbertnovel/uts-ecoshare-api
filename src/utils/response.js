const responsBerhasil = (res, kodeStatus, pesan, data = null) => {
  return res.status(kodeStatus).json({
    berhasil: true,
    pesan,
    data,
  });
};

module.exports = { responsBerhasil };
