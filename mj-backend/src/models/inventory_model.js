const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product_model'); // sesuaikan dengan nama file
const Branch = require('./branch_model'); // sesuaikan dengan nama file


const Inventory = sequelize.define('Inventory', {
  branch_id: { type: DataTypes.INTEGER, allowNull: false },
  product_id: { type: DataTypes.INTEGER, allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  tableName: 'inventory',
  timestamps: true
});

// Relasi
Product.hasMany(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });


Branch.hasMany(Inventory, { foreignKey: 'branch_id', as: 'Inventories' });
Inventory.belongsTo(Branch, { foreignKey: 'branch_id', as: 'Branch' });


module.exports = Inventory;
