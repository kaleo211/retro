var Sequelize = require('sequelize');
var models = require('../models');

var item = {};

var get = function (boardID, column) {
  return models.Item.findAll({
    where: {
      BoardId: boardID,
      column: column
    },
    order: [['createdAt', 'ASC']]
  }).then(items => {
    return items.map(function (m) {
      return m.get({ plain: true });
    });
  });
};

var getAll = function (boardID) {
  return Promise.all([
    get(boardID, 'happy'),
    get(boardID, 'med'),
    get(boardID, 'sad'),
    get(boardID, 'action')
  ]).then(([happy, med, sad, action]) => {
    var items = {};
    items['happy'] = happy;
    items['med'] = med;
    items['sad'] = sad;
    items['action'] = action;
    return items;
  });
};

item.get = function (boardID) {
  return getAll(boardID);
};

item.delete = function (boardID, itemID) {
  return models.Item.destroy({
    where: {
      id: itemID
    }
  }).then(resp => {
    return getAll(boardID);
  });
};

item.put = function (boardID, itemID) {
  return models.Item.update(
    {checked: true},
    {where: {id: itemID}}
  ).then(resp => {
    return getAll(boardID);
  });
};

item.post = function (item) {
  return models.Item.create(item).then(item => {
    return getAll(item.BoardId);
  });
};

module.exports = item;
