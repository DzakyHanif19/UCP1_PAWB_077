const express = require('express');
const db = require('../databases/db'); // Koneksi database
const router = express.Router();

// Menampilkan daftar Bibit
router.get('/', (req, res) => {
  const query = 'SELECT * FROM bibit';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('bibitmysql/list', { bibit: results });
  });
});

// Form Tambah Bibit
router.get('/add', (req, res) => {
  res.render('bibitmysql/add');
});

// Tambah Bibit
router.post('/add', (req, res) => {
  const { nama } = req.body;
  const query = 'INSERT INTO bibit (namabibit) VALUES (?)';
  db.query(query, [nama], (err) => {
    if (err) throw err;
    res.redirect('/bibitmysql');
  });
});

// Form Edit Bibit (Tambahan)
router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM bibit WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.render('bibitmysql/edit', { data: results[0] });
  });
});

// Edit Bibit
router.post('/edit/:id', (req, res) => {
  const { nama} = req.body;
  const { id } = req.params;
  const query = 'UPDATE bibit SET namabibit = ? WHERE id = ?';
  db.query(query, [nama, id], (err) => {
    if (err) throw err;
    res.redirect('/bibitmysql');
  });
});


router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM bibit WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.redirect('/bibitmysql');
  });
});

module.exports = router;