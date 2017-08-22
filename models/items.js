"use strict";

module.exports = function (sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    column: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE
  });

  Item.associate = function (models) {
    Item.belongsTo(models.Board, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Item;
};
