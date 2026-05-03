const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//import routes
const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);

const reportRoutes = require('./routes/reportRoutes');
app.use('/api', reportRoutes);

// route utama
app.get('/', (req, res) => {
  res.send('API Maintenance Jalan');
});

// jalankan server
app.listen(9999, () => {
  console.log('Server running on port 9999');
});