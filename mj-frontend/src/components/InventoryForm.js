import React, { useState, useEffect } from 'react';
import API from '../Api';

const InventoryForm = ({ fetchInventory, editItem, setEditItem }) => {
  const [form, setForm] = useState({ branch_id: '', product_id: '', stock: '' });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products').then(res => setProducts(res.data));
  }, []);

  useEffect(() => {
    if (editItem) setForm(editItem);
  }, [editItem]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editItem) {
      await API.put(`/inventory/${editItem.id}`, form);
      setEditItem(null);
    } else {
      await API.post('/inventory', form);
    }
    setForm({ branch_id: '', product_id: '', stock: '' });
    fetchInventory();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="branch_id" placeholder="Branch ID" value={form.branch_id} onChange={handleChange} />
      <select name="product_id" value={form.product_id} onChange={handleChange}>
        <option value="">Select Product</option>
        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
      <button type="submit">{editItem ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default InventoryForm;
