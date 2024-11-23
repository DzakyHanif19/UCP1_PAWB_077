const express = require('express');
const db = require('../databases/db'); 
const router = express.Router();

router.get('/', (req, res) => {
  const query = 'SELECT * FROM pupuk';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('pupukmysql/list', { pupuk: results });
  });
});

router.get('/add', (req, res) => {
  res.render('pupukmysql/add');
});

router.post('/add', (req, res) => {
  const { nama } = req.body;
  const query = 'INSERT INTO pupuk (namapupuk) VALUES (?)';
  db.query(query, [nama], (err) => {
    if (err) throw err;
    res.redirect('/pupukmysql');
  });
});


router.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM pupuk WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.render('pupukmysql/edit', { data: results[0] });
  });
});


router.post('/edit/:id', (req, res) => {
  const { nama} = req.body;
  const { id } = req.params;
  const query = 'UPDATE pupuk SET namapupuk = ? WHERE id = ?';
  db.query(query, [nama, id], (err) => {
    if (err) throw err;
    res.redirect('/pupukmysql');
  });
});


router.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pupuk WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.redirect('/pupukmysql');
  });
});

module.exports = router;