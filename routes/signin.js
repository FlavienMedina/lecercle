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

  db.user.count({ where: { username: username } }).then(count => {
    if(count != 0) {
      db.user.count({ where: { password: password } }).then(count => {
        if(count != 0) {
            res.redirect('/');
        }
        else {
          console.log("wrong password");
        }
      })
    }
    else {
      console.log("username doesn't exist");
    }
  } );


  // let user =
  //   db.user.update({
  //     firstname: req.body.firstname,
  //     password: req.body.password,
  //
  //   }).then(() => {
  //     res.redirect('/');
  //   });
});
module.exports = router;
