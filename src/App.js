import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductList from "./components/productList";
import CreateProduct from "./components/createProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
