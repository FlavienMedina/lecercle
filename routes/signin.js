const express = require('express');
const session = require('express-session');
const app = express();
const router = express.Router();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('../database/init');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))


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
          console.log(data.id + ' : SIGN IN');
          req.session.userId = data.id;
          console.log("SESSION : " + req.session.userId);
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
