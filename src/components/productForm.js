import React, { useState, useEffect } from "react";
import "./productForm.css";

const ProductForm = ({ productToEdit, onSave, onCancel }) => {
  const [product, setProduct] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productToSubmit = { ...product };
    if (!productToEdit) {
      delete productToSubmit.id;
    }

    onSave(productToSubmit);
  };

  return ( 
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">
          <span className="required">*</span> Name:
        </label>
        <input
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">
          <span className="required">*</span> Price:
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
 
export default ProductForm;
