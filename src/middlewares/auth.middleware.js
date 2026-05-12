const jwt = require('jsonwebtoken');

const middlewareAutentikasi = (req, res, next) => {
  try {
    const headerAutorisasi = req.headers.authorization;

    if (!headerAutorisasi || !headerAutorisasi.startsWith('Bearer ')) {
      return res.status(401).json({
        berhasil: false,
        pesan: 'Token tidak ditemukan',
      });
    }

    const token = headerAutorisasi.split(' ')[1];
    const hasilDekode = jwt.verify(token, process.env.JWT_SECRET);

    req.pengguna = hasilDekode;
    next();
  } catch (kesalahan) {
    return res.status(401).json({
      berhasil: false,
      pesan: 'Token tidak valid atau sudah kedaluwarsa',
    });
  }
};

module.exports = middlewareAutentikasi;
