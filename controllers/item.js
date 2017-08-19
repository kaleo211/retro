var Sequelize = require('sequelize');
var models = require('../models');

var item = {};

item.get = function () {
  return models.item.findAll().then(function(items) {
    return items.map(function(m) {
      return m.get({plain: true});
    });
  });
};

item.post = function () {

}

module.exports = item;
