
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');
const path    = require('path');
const mLog    = require('./modules/mLog');

const port = process.argv[2] || 4242;
const app  = express();

app.use(session({
  secret: 'flavienmedina',
  resave: false,
  saveIninitialized: true
}))

app.use(bodyParser.json());

app.use((request, response, next) => {
  console.log("Cookie:" request.cookies);
  if (request.session.userInfos) {
    response.get("x-my-user-data", JSON.stringify(request.session.userInfos));
  }
})

app.use(express.static(path.join(__dirname, 'public')));


app.post('/add-session', (request, response) => {
  request.sessions.userInfos = request.body;
  response.status(200).end();

  mLog.info(`${request.method} ${request.url}`);
});

app.get('*', (request, response) => {
  mLog.err(`The URL ${request.url} doesn't exist`);
  response.sendFile(path.join(__dirname, 'public', '404.html'))
});

app.listen(port, () => {
  mLog.info(`Server is running on port ${port}`);
})
