const express = require('express');
const router = express.Router();

const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('signup');
});
router.post('/', (req, res) => {
  let new_user =
    db.user.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      birthday: req.body.birthday,
      phone: req.body.phone,
      password: req.body.password,
    }).then(() => {
      res.redirect('/');
    });
});

module.exports = router;
