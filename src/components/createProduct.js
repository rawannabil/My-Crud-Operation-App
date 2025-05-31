import React from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/productService";
import ProductForm from "./productForm";

const CreateProduct = () => {
  const navigate = useNavigate();

  const handleSave = async (newProduct) => {
    try {
      await createProduct(newProduct);
      navigate("/");
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <ProductForm onSave={handleSave} onCancel={() => navigate("/product/{newProductId}")} />
    </div>
  );
};

export default CreateProduct;
