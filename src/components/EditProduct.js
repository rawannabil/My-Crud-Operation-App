import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, updateProduct } from "../services/productService";
import ProductForm from "./productForm";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await getProduct(id);
        setProduct(response.data.response);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleSave = async (updatedProduct) => {
    try {
      await updateProduct(id, updatedProduct);
      navigate("/"); 
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h2>Edit Product</h2>
      <ProductForm
        productToEdit={product}
        onSave={handleSave}
        onCancel={() => navigate("/")}
      />
    </div>
  );
};

export default EditProduct;
