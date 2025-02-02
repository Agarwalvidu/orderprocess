import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './flags.css'; // Import the CSS file

const FlaggedOrders = () => {
  const [flaggedOrders, setFlaggedOrders] = useState([]);

  useEffect(() => {
    fetch('/assets/error_detection(1).csv') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            const flaggedOrdersData = result.data.filter(flag => flag['Flag Reason']); // Filter by Flag Reason
            setFlaggedOrders(flaggedOrdersData);
          },
          header: true,
        });
      })
      .catch((error) => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  return (
    <div className="flags-container">
      <h2>Flagged Orders</h2>
      <div className="scrollable-table">
        <table className="flagged-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Product ID</th>
              <th>Variant</th>
              <th>Quantity</th>
              <th>Date of Order</th>
              <th>Address</th>
              <th>Flag Reason</th>
            </tr>
          </thead>
          <tbody>
            {flaggedOrders.length === 0 ? (
              <tr><td colSpan="9">No flagged orders found</td></tr>
            ) : (
              flaggedOrders.map((flag, index) => (
                <tr key={index}>
                  <td>{flag['OrderID']}</td>
                  <td>{flag['CustomerID']}</td>
                  <td>{flag['CustomerName']}</td>
                  <td>{flag['Product ID']}</td>
                  <td>{flag['Variant']}</td>
                  <td>{flag['Quantity']}</td>
                  <td>{flag['DateOfOrder']}</td>
                  <td>{flag['Address']}</td>
                  <td>
                    <span className="flag-indicator">⚠️</span>
                    {flag['Flag Reason']}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export {FlaggedOrders};
