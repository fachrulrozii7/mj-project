const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  barcode: { type: DataTypes.STRING, unique: true },
  cost_price: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  sell_price: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  supplier: { type: DataTypes.STRING }
}, {
  tableName: 'products',
  timestamps: true
});

module.exports = Product;
