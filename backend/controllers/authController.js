const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) return res.send(err);

    if (result.length === 0) {
      return res.status(404).send('User tidak ditemukan');
    }

    const user = result[0];

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).send('Password salah');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
};