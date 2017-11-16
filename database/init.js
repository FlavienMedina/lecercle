const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');

let db = {};

db.sequelize = new Sequelize('cercle', 'flavien', '', {
  host: 'localhost', dialect: 'postgres'
});

let model_pathname = path.join(__dirname, 'models');

fs
.readdirSync(model_pathname)
.filter((filename) => {
  return (filename.indexOf(".") !== 0) && (filename !== "init.js");
})
.forEach((filename) => {
  let model = db.sequelize.import(path.join(model_pathname, filename));
  db[model.name] = model;
});

module.exports = db;
