const express = require('express');
const bodyParser = require('body-parser');
const db = require('./databases/db');
const pupukmock = require('./routes/pupukmock.js');
const bibitmock = require('./routes/bibitmock.js');
const bibitmysql = require('./routes/bibitmysql.js');
const pupukmysql = require('./routes/pupukmysql.js');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use("/bibitmockup", bibitmock);
app.use("/pupukmockup", pupukmock);
app.use('/bibitmysql', bibitmysql);
app.use('/pupukmysql', pupukmysql);

// Render index.ejs when visiting /index
app.get('/index', (req, res) => {
    res.render('index');
});

// Redirect root URL to /index
app.get('/', (req, res) => {
    res.redirect('/index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
