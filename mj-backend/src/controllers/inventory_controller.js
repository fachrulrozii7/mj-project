const Inventory = require('../models/inventory_model');
const Product = require('../models/product_model');
const Branch = require('../models/branch_model');

exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll({
      include: 
        [
          { model: Product, attributes: ['name', 'barcode', 'sell_price'] },
          { model: Branch,as:'Branch', attributes: ['branch_id', 'branch_name'] }
        ]
    });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createInventory = async (req, res) => {
  try {
    const { branch_id, product_id, stock } = req.body;
    const inventory = await Inventory.create({ branch_id, product_id, stock });
    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;
    const inventory = await Inventory.findByPk(id);
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });

    inventory.stock = stock;
    await inventory.save();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findByPk(id);
    if (!inventory) return res.status(404).json({ message: 'Inventory not found' });

    await inventory.destroy();
    res.json({ message: 'Inventory deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
