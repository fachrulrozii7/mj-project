import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import InventoryList from "./components/InventoryList";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
          <Link to="/products" className="hover:underline">Products</Link>
          <Link to="/inventory" className="hover:underline">Inventory</Link>
        </nav>

        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/inventory" element={<InventoryList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
