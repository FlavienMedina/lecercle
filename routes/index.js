const express = require('express');
const router = express.Router();
const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
  if (req.session.users) {
    res.render('index',{user:req.session.users});
  }
  else {
    res.redirect('/signin');
  }
});

module.exports = router;
