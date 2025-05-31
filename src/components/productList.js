import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";
import "./productList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ name: "", price: "" });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.response);
    } catch (error) {
      alert("Failed to load products");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      alert("Failed to delete product");
      console.error(error);
    }
  };

  const filteredProducts = products.filter((p) => {
    const priceFilter = parseFloat(filters.price);
    return (
      p.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.price === "" || p.price === priceFilter)
    );
  });

  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
<div className="button-container">
        <Link to="/create">
          <button className="create-button">Create Product</button>
        </Link>
      </div>
      <h1>Products List</h1>


      <form className="filter-container" onSubmit={e => e.preventDefault()}>
        Name : <input
          placeholder="Filter by name"
          value={filters.name}
          onChange={(e) => setFilters((f) => ({ ...f, name: e.target.value }))}
        />
        Price : <input
          placeholder="Filter by price"
          type="number"
          step="0.01"
          value={filters.price}
          onChange={(e) => setFilters((f) => ({ ...f, price: e.target.value }))}
        />
      </form>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price <span style={{ color: "#999" }}>EGP</span></th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No products found</td>
            </tr>
          ) : (
            filteredProducts.map(({ id, name, price, description }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{price.toFixed(2)}</td>
                <td>{description}</td>
                <td>
                  <Link to={`/edit/${id}`}>
                    <button style={{ marginRight: 10 }}>Edit</button>
                  </Link>
                  <button className="delete-button" onClick={() => handleDelete(id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
