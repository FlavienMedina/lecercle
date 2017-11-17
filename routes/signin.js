const express = require('express');
const router = express.Router();

const db = require('../database/init');



/* GET home page. */
router.get('/', (req, res) => {
  res.render('signin');

});

router.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  db.user.findOne({
    where: {
      username: username
    }
  }).then(data => {
    if (data != null) {
      db.user.findOne({
        where: {
          username: username,
          password: password
        }
      }).then(data => {
        if (data != null) {
          let user = {
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username,
            email: data.email
          }
          req.session.users = user;
          res.redirect('/');
        } else {
          console.log("wrong password");
        }
      })
    } else {
      console.log("username doesn't exist");
    }
  })
});
module.exports = router;
