const middlewarePeran = (...daftarPeran) => {
  return (req, res, next) => {
    if (!req.pengguna || !daftarPeran.includes(req.pengguna.peran)) {
      return res.status(403).json({
        berhasil: false,
        pesan: 'Akses ditolak',
      });
    }

    next();
  };
};

module.exports = middlewarePeran;
