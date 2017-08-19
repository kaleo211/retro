var Sequelize = require('sequelize');
var models = require('../models');

var board = {};

board.get = function () {
  return models.board.findAll().then(function(boards) {
    return boards.map(function(m) {
      return m.get({plain: true});
    });
  });
};

module.exports = board;
