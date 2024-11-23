const express = require('express');
const router = express.Router();

let pupuk = [
  { id: 1, nama: 'Segar', jenis: 'Kimia' },
  { id: 2, nama: 'Bagus', jenis: 'Organik' },
];


router.get('/', (req, res) => {
  res.render('pupukmock/list', { pupuk });
});


router.get('/add', (req, res) => {
  res.render('pupukmock/add');
});


router.post('/add', (req, res) => {
  const { nama, jenis } = req.body;
  const newPupuk = { id: pupuk.length + 1, nama, jenis };
  pupuk.push(newPupuk);
  res.redirect('/pupukmockup');
});


router.get('/edit/:id', (req, res) => {
  const data = pupuk.find(p => p.id === parseInt(req.params.id));
  res.render('pupukmock/edit', { data });
});


router.post('/edit/:id', (req, res) => {
  const { nama, jenis } = req.body;
  const index = pupuk.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    pupuk[index] = { id: parseInt(req.params.id), nama, jenis };
  }
  res.redirect('/pupukmockup');
});


router.get('/delete/:id', (req, res) => {
  pupuk = pupuk.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/pupukmockup');
});

module.exports = router;