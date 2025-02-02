import React, { useState } from "react";
import "./add_items.css";

const AddItem = () => {
  const [product, setProduct] = useState({
    name: "",
    product_id: "",
    price: "",
    quantity: "",
    expiry: "",
    green: "Yes",
    variants: [],
  });

  const [variant, setVariant] = useState({ name: "", sku: "", price: "", stock: "" });
  const [variants, setVariants] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (e) => {
    setVariant({ ...variant, [e.target.name]: e.target.value });
  };

  const addVariant = () => {
    if (variant.name && variant.sku && variant.price && variant.stock) {
      setVariants([...variants, variant]);
      setVariant({ name: "", sku: "", price: "", stock: "" });
    }
  };

  const addProduct = (productData) => {
    // Your logic to handle adding the product
    console.log("Product added:", productData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...product, variants: JSON.stringify(variants) });
    setProduct({
      name: "",
      product_id: "",
      price: "",
      quantity: "",
      expiry: "",
      green: "Yes",
      variants: [],
    });
    setVariants([]);
    window.alert("New item added to the inventory!");
    window.location.href = "/inventory";
  };

  return (
    <div className="add-inventory-container">
      <div className="add-inventory-form">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />

          <label>Product ID:</label>
          <input type="number" name="product_id" value={product.product_id} onChange={handleChange} required />

          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />

          <label>Quantity:</label>
          <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />

          <label>Expiry (months):</label>
          <input type="number" name="expiry" value={product.expiry} onChange={handleChange} required />

          <label>Sustainable:</label>
          <select name="green" value={product.green} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <h3>Add Variants</h3>
          <label>Variant Name:</label>
          <input type="text" name="name" value={variant.name} onChange={handleVariantChange} />

          <label>SKU:</label>
          <input type="text" name="sku" value={variant.sku} onChange={handleVariantChange} />

          <label>Price:</label>
          <input type="number" name="price" value={variant.price} onChange={handleVariantChange} />

          <label>Stock:</label>
          <input type="number" name="stock" value={variant.stock} onChange={handleVariantChange} />

          <button type="button" onClick={addVariant}>Add Variant</button>
          <button type="submit">Add Product</button>
        </form>

        {variants.length > 0 && (
          <div className="variants-list">
            <h4>Variants Added:</h4>
            <ul>
              {variants.map((v, index) => (
                <li key={index}>{v.name} - {v.sku} - ${v.price} - Stock: {v.stock}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export { AddItem };
