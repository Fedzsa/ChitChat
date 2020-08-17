'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Message);
      User.belongsToMany(models.Room, { through: models.UsersRooms });
      User.belongsToMany(models.User, { through: models.Friend, foreignKey: 'userId', otherKey: 'friendId', as: 'Friends' });
      User.hasMany(models.Friend, { foreignKey: 'userId', as: 'User' });
      User.hasMany(models.Friend, { foreignKey: 'friendId', as: 'Friend' });
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};