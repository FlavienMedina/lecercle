const express = require('express');
const router = express.Router();
const session = require('express-session');

const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
  console.log(req.session.id);
  db.user.count().then((nb) => {
    res.render('index', { count: nb });
  });
});

module.exports = router;
