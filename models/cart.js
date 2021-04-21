'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {foreignKey: 'UserId'})
      Cart.belongsTo(models.Product, {foreignKey: 'ProductId'})
    }
  };
  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    quantity: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};