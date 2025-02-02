import { useState } from "react";
import "../activeorder/activeorder.css";

// Customer data
const customers = [
  {
    id: "C052",
    name: "John Doe",
    email: "john@example.com",
    address: "528 Main St, City, Country",
    orders: [
      { id: 101, product_id: 101, item: "Matte Lipstick", price: 12.99, quantity: 2, recyclable: true },
      { id: 102, product_id: 102, item: "BB Cream", price: 15.99, quantity: 1, recyclable: false },
      { id: 103, product_id: 103, item: "Matte Lipstick", price: 12.99, quantity: 1, recyclable: true },
      { id: 104, product_id: 104, item: "Nail Polish", price: 8.99, quantity: 5, recyclable: true },
      { id: 105, product_id: 105, item: "Face Mask", price: 18.99, quantity: 3, recyclable: true }
    ]
  },
  {
    id: "C053",
    name: "Jane Smith",
    email: "jane@example.com",
    address: "123 Elm St, City, Country",
    orders: [
      { id: 106, product_id: 106, item: "Gel Eyeliner", price: 8.99, quantity: 1, recyclable: true },
      { id: 107, product_id: 107, item: "Waterproof Mascara", price: 9.99, quantity: 2, recyclable: false },
      { id: 108, product_id: 108, item: "Lip Balm", price: 5.99, quantity: 3, recyclable: true },
      { id: 109, product_id: 109, item: "Foundation", price: 22.99, quantity: 4, recyclable: true },
      { id: 110, product_id: 110, item: "Compact Powder", price: 13.99, quantity: 6, recyclable: true }
    ]
  },
  {
    id: "C054",
    name: "Sarah Lee",
    email: "sarah@example.com",
    address: "456 Oak St, City, Country",
    orders: [
      { id: 111, product_id: 111, item: "Matte Lipstick", price: 12.99, quantity: 10, recyclable: true },
      { id: 112, product_id: 112, item: "Shimmer Powder", price: 10.99, quantity: 8, recyclable: false },
      { id: 113, product_id: 113, item: "Nail Polish", price: 8.99, quantity: 4, recyclable: true },
      { id: 114, product_id: 114, item: "Face Wash", price: 15.99, quantity: 6, recyclable: true }
    ]
  },
  {
    id: "C055",
    name: "Michael Scott",
    email: "michael@example.com",
    address: "789 Pine St, City, Country",
    orders: [
      { id: 115, product_id: 115, item: "Eyeliner", price: 10.99, quantity: 3, recyclable: true },
      { id: 116, product_id: 116, item: "Lip Gloss", price: 7.99, quantity: 5, recyclable: false },
      { id: 117, product_id: 117, item: "Face Cream", price: 20.99, quantity: 2, recyclable: true },
      { id: 118, product_id: 118, item: "Body Lotion", price: 18.99, quantity: 7, recyclable: true },
      { id: 119, product_id: 119, item: "Hair Serum", price: 25.99, quantity: 4, recyclable: true }
    ]
  },
  {
    id: "C056",
    name: "Angela Martin",
    email: "angela@example.com",
    address: "321 Maple St, City, Country",
    orders: [
      { id: 120, product_id: 120, item: "BB Cream", price: 14.99, quantity: 6, recyclable: true },
      { id: 121, product_id: 121, item: "Shampoo", price: 12.99, quantity: 8, recyclable: true },
      { id: 122, product_id: 122, item: "Conditioner", price: 13.99, quantity: 4, recyclable: true },
      { id: 123, product_id: 123, item: "Hair Color", price: 19.99, quantity: 3, recyclable: true }
    ]
  }
];


const CustomerOrders = () => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpand = (customerId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [customerId]: !prev[customerId]
    }));
  };

  // Calculate sustainability score for each customer
  const calculateSustainabilityScore = (orders) => {
    let score = 0;
    orders.forEach((order) => {
      if (order.recyclable) {
        score += order.quantity * 10; // Each recyclable product adds 10 points per quantity
      }
    });
    return score;
  };

  return (
    <div className="orders-container">
      <hr className='lines'/>
      <h2>Customer Orders & Sustainability Score</h2>
      <hr className='lines' style={{marginBottom:"20px"}}/>
      <div className="scrollable-table">
        <table className="unique-active-orders-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Total Sustainability Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              const sustainabilityScore = calculateSustainabilityScore(customer.orders);
              return (
                <>
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{sustainabilityScore}</td>
                    <td>
                      <button onClick={() => toggleExpand(customer.id)}>
                        {expandedRows[customer.id] ? "Hide" : "Show"} Orders
                      </button>
                    </td>
                  </tr>
                  {expandedRows[customer.id] && (
                    <tr>
                      <td colSpan={6}>
                        <div className="scrollable-table">
                          <h3>Order History</h3>
                          <table className="unique-active-orders-table">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Product ID</th>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Sustainable</th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              {customer.orders.map((order) => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>{order.product_id}</td>
                                  <td>{order.item}</td>
                                  <td>${order.price}</td>
                                  <td>{order.recyclable ? "Yes" : "No"}</td>
                                  <td>{order.quantity}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { CustomerOrders };
