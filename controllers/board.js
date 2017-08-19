var Sequelize = require('sequelize');
var models = require('../models');

var board = {};

board.get = function () {
  return models.Board.findAll().then(boards => {
    return boards.map(function(m) {
      return m.get({plain: true});
    });
  });
};

board.post = function (board) {
  console.log(board);
  return models.Board.create(board).then(board => {
    return board.get({plain: true});
  });
};

module.exports = board;
