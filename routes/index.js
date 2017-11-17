const express = require('express');
const router = express.Router();
const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
  console.log(req.session.users.firstname);
  db.user.count().then((nb) => {
    res.render('index', { count: nb });
  });
});

module.exports = router;
