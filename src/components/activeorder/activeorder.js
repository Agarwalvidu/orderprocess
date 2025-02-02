import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './activeorder.css'; // Import the CSS file

const ActiveOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/assets/synthetic_orders.csv') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            const successOrders = result.data.filter(order => order['Delivery Status'] === 'Success');
            setOrders(successOrders);
          },
          header: true,
        });
      })
      .catch((error) => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  return (
    <div className="orders-container">
      <hr className='lines'/>
      <h2>Active Orders</h2>
      <hr className='lines' style={{marginBottom:"20px"}}/>
      <div className="scrollable-table">
        <table className="unique-active-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Email</th>
              <th>Order Time</th>
              <th>Delivery Time</th>
              <th>Delivery Address</th>
              <th>Customer Availability</th>
              <th>Delivery Status</th>
              <th>Traffic Condition</th>
              <th>Weather Condition</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="10">No active orders found</td></tr>
            ) : (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{order['Order ID']}</td>
                  <td>{order['Customer ID']}</td>
                  <td>{order['Customer Email']}</td>
                  <td>{order['Order Time']}</td>
                  <td>{order['Delivery Time']}</td>
                  <td>{order['Delivery Address']}</td>
                  <td>{order['Customer Availability']}</td>
                  <td>{order['Delivery Status']}</td>
                  <td>{order['Traffic Condition']}</td>
                  <td>{order['Weather Condition']}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveOrders;
