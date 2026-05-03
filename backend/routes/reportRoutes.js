const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// hanya USER yang bisa buat laporan
router.post('/report', auth, role(['user']), (req, res) => {
  res.send('Laporan berhasil dibuat');
});

// hanya PENANGGUNG JAWAB yang bisa lihat semua
router.get('/reports', auth, role(['admin']), (req, res) => {
  res.send('Data semua laporan');
});

module.exports = router;