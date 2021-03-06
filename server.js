const express    = require('express');
const path       = require('path');
const moment     = require('moment');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const db = require('./database/init');

const app = express();

const port = process.argv[2] || '4242';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const index = require('./routes/index');
const users = require('./routes/users');
const signup = require('./routes/signup');
const signin = require('./routes/signin');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/signin', signin);
app.use('/signup', signup);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

db.sequelize.sync().then(() => {
  console.log("Database config success!");

  app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`);
  });

}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
