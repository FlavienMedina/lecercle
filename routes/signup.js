const express = require('express');
const router = express.Router();

const db = require('../database/init');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('signup');
});
router.post('/', (req, res) => {

  function isFieldUnique(email, username, cb) {
    return db.user.count({
        where: {
          username: username,
        }
      })
      .then(count => {
        if (count != 0) {
          console.log(username + ' username already exists');
          return false;
        } else {
          db.user.count({
              where: {
                email: email,
              }
            })
            .then(count => {
              if (count != 0) {
                console.log(email + ' email already exists');
                return cb(false);
              }
              return cb(true);
            });
        }

      });
  }

  isFieldUnique(req.body.email, req.body.username, (response) => {
    if (response) {
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
          let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email
          }
          req.session.users = user;
          res.redirect('/');
        });
    }
  });


});

module.exports = router;
