const Product = require('../models/product_model');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, category, barcode, cost_price, sell_price, supplier } = req.body;
    const product = await Product.create({ name, category, barcode, cost_price, sell_price, supplier });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, barcode, cost_price, sell_price, supplier } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update field jika ada di req.body
    if (name !== undefined) product.name = name;
    if (category !== undefined) product.category = category;
    if (barcode !== undefined) product.barcode = barcode;
    if (cost_price !== undefined) product.cost_price = cost_price;
    if (sell_price !== undefined) product.sell_price = sell_price;
    if (supplier !== undefined) product.supplier = supplier;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};