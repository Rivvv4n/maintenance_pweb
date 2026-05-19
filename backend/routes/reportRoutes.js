const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

// hanya USER yang bisa buat laporan
router.post('/report', auth, role(['user']), (req, res) => {
  res.send('Laporan berhasil dibuat');
});

router.get('/report/saya', auth, role(['user']), (req, res) => {
  res.json({ message: `Laporan milik user id: ${req.user.id}` });
});

// PENANGGUNGJAWAB: lihat semua laporan
router.get('/reports', auth, role(['penanggungjawab']), (req, res) => {
  res.json({ message: 'Data semua laporan' });
});

// PENANGGUNGJAWAB: update status laporan
router.put('/report/:id/status', auth, role(['penanggungjawab']), (req, res) => {
  res.json({ message: `Status laporan id ${req.params.id} berhasil diupdate` });
});

module.exports = router;
