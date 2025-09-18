const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// const Inventory = require('./inventory_model'); // sesuaikan dengan nama file

const Branch = sequelize.define('Branch', {
  branch_id: { type: DataTypes.INTEGER, allowNull: false,primaryKey: true},
  branch_name: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'master_branch',
  timestamps: false
});

// // Relasi
// Inventory.belongsTo(Branch, { foreignKey: 'branch_id' });
// Branch.hasMany(Inventory, { foreignKey: 'branch_id' });
module.exports = Branch;
