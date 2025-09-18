const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const productRoutes = require('./routes/product_routes');
const inventoryRoutes = require('./routes/inventory_routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);
app.use('/api/products', productRoutes);


// app.use('/api/products', productRoutes);

// Sinkronisasi DB & start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to DB:', err);
  });