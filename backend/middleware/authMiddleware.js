const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send('Token tidak ada');

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) return res.status(401).send('Token tidak valid');

    req.user = user; // simpan data user
    next();
  });
};