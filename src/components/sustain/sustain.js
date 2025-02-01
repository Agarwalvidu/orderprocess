import { useState } from "react";
import "./sustain.css"; // Ensure you have a corresponding CSS file

const customers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    sustainabilityScore: 3,
    orders: [
      { id: 101, item: "Shirt", recyclable: true },
      { id: 102, item: "Jeans", recyclable: false },
      { id: 103, item: "Shoes", recyclable: true }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    sustainabilityScore: 2,
    orders: [
      { id: 104, item: "T-shirt", recyclable: true },
      { id: 105, item: "Jeans", recyclable: false },
      { id: 104, item: "T-shirt", recyclable: true },
      { id: 105, item: "Jeans", recyclable: false }
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

  return (
    <div className="container">
      <h2>Customer Orders & Sustainability</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Email</th>
            <th>Sustainability Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <>
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.sustainabilityScore}</td>
                <td>
                  <button onClick={() => toggleExpand(customer.id)}>
                    {expandedRows[customer.id] ? "Hide" : "Show"}
                  </button>
                </td>
              </tr>
              {expandedRows[customer.id] && (
                <tr>
                  <td colSpan={4}>
                    <div className="order-history">
                      <h3>Order History</h3>
                      <table className="order-table">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Item</th>
                            <th>Recyclable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customer.orders.map((order) => (
                            <tr key={order.id}>
                              <td>{order.id}</td>
                              <td>{order.item}</td>
                              <td>{order.recyclable ? "Yes" : "No"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export {CustomerOrders};