const express = require('express')

const router = express.Router();

let bibitmockup = [
  { id: 1, nama: 'bibitmockup Kangkung', jenis: 'Bagus' },
  { id: 2, nama: 'bibitmockup Ubi', jenis: 'Akar' },
];


router.get('/', (req, res) => {
  res.render('bibitmock/list', { bibitmockup });
});


router.get('/add', (req, res) => {
  res.render('bibitmock/add');
});

router.post('/add', (req, res) => {
  const { nama, jenis } = req.body;
  const newbibitmockup = { id: bibitmockup.length + 1, nama, jenis };
  bibitmockup.push(newbibitmockup);
  res.redirect('/bibitmockup');
});

router.get('/edit/:id', (req, res) => {
  const data = bibitmockup.find(b => b.id === parseInt(req.params.id));
  res.render('bibitmock/edit', { data });
});


router.post('/edit/:id', (req, res) => {
  const { nama, jenis } = req.body;
  const index = bibitmockup.findIndex(b => b.id === parseInt(req.params.id));
  if (index !== -1) {
    bibitmockup[index] = { id: parseInt(req.params.id), nama, jenis };
  }
  res.redirect('/bibitmockup');
});


router.get('/delete/:id', (req, res) => {
  bibitmockup = bibitmockup.filter(b => b.id !== parseInt(req.params.id));
  res.redirect('/bibitmockup');
});

module.exports = router;