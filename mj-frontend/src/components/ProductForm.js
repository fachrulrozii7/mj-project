import React, { useState, useEffect } from 'react';
import API from '../Api';

const ProductForm = ({ fetchProducts, editProduct, setEditProduct }) => {
  const [form, setForm] = useState({
    name: '', category: '', barcode: '', cost_price: '', sell_price: '', supplier: ''
  });

  useEffect(() => {
    if (editProduct) setForm(editProduct);
  }, [editProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProduct) {
      await API.put(`/products/${editProduct.id}`, form);
      setEditProduct(null);
    } else {
      await API.post('/products', form);
    }
    setForm({ name: '', category: '', barcode: '', cost_price: '', sell_price: '', supplier: '' });
    fetchProducts();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
      <input name="barcode" placeholder="Barcode" value={form.barcode} onChange={handleChange} />
      <input name="cost_price" placeholder="Cost Price" value={form.cost_price} onChange={handleChange} />
      <input name="sell_price" placeholder="Sell Price" value={form.sell_price} onChange={handleChange} />
      <input name="supplier" placeholder="Supplier" value={form.supplier} onChange={handleChange} />
      <button type="submit">{editProduct ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ProductForm;
