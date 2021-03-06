module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Board', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: DataTypes.DATE,
    locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    name: DataTypes.STRING
  });
};
