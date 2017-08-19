var Sequelize = require('sequelize');
var fs = require('fs')
var path = require('path')

var sequelize = new Sequelize(
  process.env.RETRO_MYSQL_DATABASE,
  process.env.RETRO_MYSQL_USER,
  process.env.RETRO_MYSQL_PASSWORD, {
  host: process.env.RETRO_MYSQL_HOST,
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

sequelize.sync();

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.')!=0 && file != 'index.js';
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(model) {
  if ("associate" in db[model]) {
    db[model].associate(db);
  }
});

module.exports = db;
