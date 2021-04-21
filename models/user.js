'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {through: 'Cart', foreignKey: 'UserId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
     unique: true,
     validate: {
       isEmail: {
         args: true,
         msg: "Invalid email format"
       },
       notEmpty: {
        args: true,
        msg: 'Email is required'
      }
     }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is require"
        }
      }
    },
    roles: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  })
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password)
    if(!user.roles) user.roles = "Customer"
  });
  return User;
};