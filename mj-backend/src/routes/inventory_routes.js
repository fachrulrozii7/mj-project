const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory_controller');

router.get('/', inventoryController.getAllInventory);
router.post('/', inventoryController.createInventory);
router.put('/:id', inventoryController.updateInventory);
router.delete('/:id', inventoryController.deleteInventory);

module.exports = router;
