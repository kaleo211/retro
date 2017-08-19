module.exports = function (sequelize, DataTypes) {
  return sequelize.define('item', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    week: DataTypes.STRING
  });
};
