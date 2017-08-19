module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Board', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  });
};
