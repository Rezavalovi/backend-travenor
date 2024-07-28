'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destination.hasMany(models.Favorite, {
        foreignKey: 'destinationId'
      })
    }
  }
  Destination.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};