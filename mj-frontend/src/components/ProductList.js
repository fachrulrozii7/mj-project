import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [formDetail, setForm] = useState({
    name: "",
    category: "",
    barcode: "",
    cost_price: "",
    sell_price: "",
    supplier: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:5000/api/products/${editingId}`, formDetail);
    } else {
      await axios.post("http://localhost:5000/api/products", formDetail);
    }
    setForm({ name: "", category: "", barcode: "", cost_price: "", sell_price: "", supplier: "" });
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Product Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formDetail).map((field) => (
            <input
              key={field}
              type={field.includes("price") ? "number" : "text"}
              placeholder={field.replace("_", " ").toUpperCase()}
              value={formDetail[field]}
              onChange={(e) => setForm({ ...formDetail, [field]: e.target.value })}
              className="border rounded p-2"
              required={field === "name" || field === "cost_price" || field === "sell_price"}
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg shadow p-4 bg-white">
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p className="text-sm text-gray-600">Category: {p.category}</p>
            <p className="text-sm text-gray-600">Barcode: {p.barcode}</p>
            <p className="text-sm text-gray-600">Cost: Rp {p.cost_price}</p>
            <p className="text-sm text-gray-600">Sell: Rp {p.sell_price}</p>
            <p className="text-sm text-gray-600">Supplier: {p.supplier}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
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
