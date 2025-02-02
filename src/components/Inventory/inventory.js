import React, { useState } from "react";

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
        { name: "Berry", sku: "LIP-BERRY", price: "12.99", stock: 80}
      ])
    },
    {
      name: "Foundation",
      product_id: 102,
      price: "19.99",
      quantity: 300,
      expiry: "18",
      green: "No",
      variants: JSON.stringify([
        { name: "Light", sku: "FD-LIGHT", price: "19.99", stock: 199},
        { name: "Medium", sku: "FD-MEDIUM", price: "19.99", stock: 90},
        {name: "Dark", sku: "FD-DARK", price: "19.99", stock: 109}
      ])
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
        { name: "Deep", sku: "FD-DEEP", price: "15.5", stock: 111 }
      ])
    },
    {
      name: "Waterproof Mascara",
      product_id: 104,
      price: "14.99",
      quantity: 350,
      expiry: "12",
      green: "No"
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
        { name: "Brown", sku: "EL-BROWN", price: "9.99", stock: 270},
        { name: "Blue", sku: "EL-BLUE", price: "9.99", stock: 180 }
      ])
    },
    {
      name: "Blush Palette",
      product_id: 106,
      price: "22",
      quantity: 250,
      expiry: "12",
      green: "Yes"
    },
    {
      name: "Highlighter Stick",
      product_id: 107,
      price: "13.75",
      quantity: 500,
      expiry: "24",
      green: "No"
    },
    {
      name: "Setting Spray",
      product_id: 108,
      price: "17.99",
      quantity: 300,
      expiry: "12",
      green: "Yes"
    },
    {
      name: "BB Cream",
      product_id: 109,
      price: "16.50",
      quantity: 400,
      expiry: "12",
      green: "No",
      variants: JSON.stringify([
        { name: "Light", sku: "BB-LIGHT", price: "16.50", stock: 175},
        { name: "Medium", sku: "BB-MEDIUM", price: "16.50", stock: 100},
        { name: "Dark", sku: "BB-DARK", price: "16.50", stock: 125}
      ])
    },
  ];

  return (
    <div className="container">
      <table className="responsive-table">
        <caption>Beauty Product Inventory</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Product ID</th>
            <th>Price Per Unit(in $)</th>
            <th>Quantity in Inventory</th>
            <th>Expiry(in months)</th>
            <th>Sustainable(Green/Non-green)</th>
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
  );
};

const ProductRow = ({ product }) => {
  const [showVariants, setShowVariants] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity || 0);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const handleChange = (e) => setQuantity(Number(e.target.value));

  return (
    <>
      <tr>
        <td>{product.name}</td>
        <td>{product.product_id}</td>
        <td>{product.price}</td>
        <td>
          <button onClick={handleDecrease}>-</button>
          <input type="number" value={quantity} onChange={handleChange} />
          <button onClick={handleIncrease}>+</button>
        </td>
        <td>{product.expiry}</td>
        <td>{product.green}</td>
        <td>
          <button onClick={() => setShowVariants(!showVariants)}>
            {showVariants ? "Hide Variants" : "Show Variants"}
          </button>
        </td>
      </tr>
      {showVariants && product.variants && (
        <tr>
          <td colSpan="7">
            <table className="nested-table">
              <thead>
                <tr>
                  <th>Variant Name</th>
                  <th>SKU</th>
                  <th>Price Per Unit</th>
                  <th>Quantity in Inventory</th>
                </tr>
              </thead>
              <tbody>
                {JSON.parse(product.variants).map((variant, idx) => (
                  <tr key={idx}>
                    <td>{variant.name}</td>
                    <td>{variant.sku}</td>
                    <td>{variant.price}</td>
                    <td>{variant.stock}</td>
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

export default Inventory;