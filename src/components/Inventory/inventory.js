import React, { useState } from "react";
import "./inventory.css";

const Inventory = () => {
  const products = [
    {
      name: "Matte Lipstick",
      product_id: 101,
      price: "12.99",
      quantity: 150,
      expiry: "24",
      green: "Yes",
      variants: JSON.stringify([
        { name: "Red", sku: "LIP-RED", price: "12.99", stock: 50 },
        { name: "Nude", sku: "LIP-NUDE", price: "12.99", stock: 20 },
        { name: "Berry", sku: "LIP-BERRY", price: "12.99", stock: 80 },
      ]),
    },
    {
      name: "Foundation",
      product_id: 102,
      price: "19.99",
      quantity: 300,
      expiry: "18",
      green: "No",
      variants: JSON.stringify([
        { name: "Light", sku: "FD-LIGHT", price: "19.99", stock: 199 },
        { name: "Medium", sku: "FD-MEDIUM", price: "19.99", stock: 90 },
        { name: "Dark", sku: "FD-DARK", price: "19.99", stock: 109 },
      ]),
    },
    {
      name: "Compact Powder",
      product_id: 103,
      price: "15.5",
      quantity: 400,
      expiry: "36",
      green: "Yes",
      variants: JSON.stringify([
        { name: "Light", sku: "FD-LIGHT", price: "15.5", stock: 200 },
        { name: "Medium", sku: "FD-MEDIUM", price: "15.5", stock: 89 },
        { name: "Deep", sku: "FD-DEEP", price: "15.5", stock: 111 },
      ]),
    },
    {
      name: "Waterproof Mascara",
      product_id: 104,
      price: "14.99",
      quantity: 350,
      expiry: "12",
      green: "No",
    },
    {
      name: "Gel Eyeliner",
      product_id: 105,
      price: "9.99",
      quantity: 600,
      expiry: "24",
      green: "Yes",
      variants: JSON.stringify([
        { name: "Black", sku: "EL-BLACK", price: "9.99", stock: 150 },
        { name: "Brown", sku: "EL-BROWN", price: "9.99", stock: 270 },
        { name: "Blue", sku: "EL-BLUE", price: "9.99", stock: 180 },
      ]),
    },
    {
      name: "Blush Palette",
      product_id: 106,
      price: "22",
      quantity: 250,
      expiry: "12",
      green: "Yes",
    },
    {
      name: "Highlighter Stick",
      product_id: 107,
      price: "13.75",
      quantity: 500,
      expiry: "24",
      green: "No",
    },
    {
      name: "Setting Spray",
      product_id: 108,
      price: "17.99",
      quantity: 300,
      expiry: "12",
      green: "Yes",
    },
    {
      name: "BB Cream",
      product_id: 109,
      price: "16.50",
      quantity: 400,
      expiry: "12",
      green: "No",
      variants: JSON.stringify([
        { name: "Light", sku: "BB-LIGHT", price: "16.50", stock: 175 },
        { name: "Medium", sku: "BB-MEDIUM", price: "16.50", stock: 100 },
        { name: "Dark", sku: "BB-DARK", price: "16.50", stock: 125 },
      ]),
    },
  ];

  return (
    <div className="orders-container">
      <h2>Inventory</h2>
      <div className="scrollable-table">
        <table className="unique-active-orders-table">
          <thead>
            <tr>
              <th colSpan="7">Inventory</th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Product ID</th>
              <th>Price Per Unit (in $)</th>
              <th>Quantity in Inventory</th>
              <th>Expiry (in months)</th>
              <th>Sustainable (Green/Non-green)</th>
              <th>Variants</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductRow key={index} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductRow = ({ product }) => {
  const [showVariants, setShowVariants] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity);
  const [variants, setVariants] = useState(
    product.variants ? JSON.parse(product.variants) : []
  );

  const handleProductQuantityChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setQuantity(value);
  };

  const handleVariantQuantityChange = (index, e) => {
    const updatedVariants = [...variants];
    updatedVariants[index].stock = Math.max(0, parseInt(e.target.value) || 0);
    setVariants(updatedVariants);
  };

  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.product_id}</td>
        <td>{product.price}</td>
        <td>
          <input
            type="number"
            value={quantity}
            onChange={handleProductQuantityChange}
            min="0"
          />
        </td>
        <td>{product.expiry}</td>
        <td>{product.green}</td>
        <td>
          {variants.length > 0 ? (
            <button onClick={() => setShowVariants(!showVariants)}>
              {showVariants ? "Hide Variants" : "Show Variants"}
            </button>
          ) : (
            "-"
          )}
        </td>
      </tr>
      {showVariants && variants.length > 0 && (
        <tr>
          <td colSpan="7">
            <table className="unique-active-orders-table">
              <thead>
                <tr>
                  <th>Variant Name</th>
                  <th>SKU</th>
                  <th>Price Per Unit</th>
                  <th>Quantity in Inventory</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant, idx) => (
                  <tr key={idx}>
                    <td>{variant.name}</td>
                    <td>{variant.sku}</td>
                    <td>{variant.price}</td>
                    <td>
                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => handleVariantQuantityChange(idx, e)}
                        min="0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};


export {Inventory};