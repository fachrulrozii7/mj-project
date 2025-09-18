import React, { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({ branch_id: "", product_id: "", stock: "" });

  const fetchInventory = async () => {
    const res = await axios.get("http://localhost:5000/api/inventory");
    console.log(res.data);
    setInventory(res.data);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/inventory", form);
    setForm({ product_id: "", stock: "" });
    fetchInventory();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/inventory/${id}`);
    fetchInventory();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Inventory Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Branch ID"
            value={form.branch_id}
            onChange={(e) => setForm({ ...form, branch_id: e.target.value })}
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Product ID"
            value={form.product_id}
            onChange={(e) => setForm({ ...form, product_id: e.target.value })}
            className="border rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Inventory
        </button>
      </form>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inventory.map((i) => (
          <div key={i.id} className="border rounded-lg shadow p-4 bg-white">
            <h2 className="font-semibold text-lg">{i.Product?.name || "No Product"}</h2>
            <p className="text-sm text-gray-600">Branch : {i.Branch?.branch_name}</p>
            <p className="text-sm text-gray-600">Stock: {i.stock}</p>
            <p className="text-sm text-gray-600">Price: Rp {i.Product?.sell_price}</p>
            <div className="mt-3">
              <button
                onClick={() => handleDelete(i.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
