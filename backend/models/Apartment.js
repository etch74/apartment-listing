const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Apartment = sequelize.define('Apartment', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  location: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  bedrooms: { type: DataTypes.INTEGER },
  bathrooms: { type: DataTypes.INTEGER },
  size: { type: DataTypes.INTEGER },
  image: { type: DataTypes.BLOB('long') }, // Add this field for the image
}, { timestamps: true });

module.exports = Apartment;
