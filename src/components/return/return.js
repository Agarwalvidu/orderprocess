import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import '../activeorder/activeorder.css'; // Import the CSS file

const ReturnOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/assets/return.csv') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            const parsedOrders = result.data.map((order) => {
              // Apply initial class based on Acknowledgement value
              if (order.Acknowledgement === 'Accepted') {
                order.ackClass = 'green';
              } else if (order.Acknowledgement === 'Rejected') {
                order.ackClass = 'red';
              }
              return order;
            });
            setOrders(parsedOrders); // Set orders with the initial ackClass
          },
          header: true,
        });
      })
      .catch((error) => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  const handleAcknowledgementChange = (index, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index].Acknowledgement = value;

    if (value === 'Accepted') {
      updatedOrders[index].ackClass = 'green'; 
    } else if (value === 'Rejected') {
      updatedOrders[index].ackClass = 'red';
    }
    
    setOrders(updatedOrders);
  };

  const handleReturnStatusChange = (index, value) => {
    const updatedOrders = [...orders];
    if (updatedOrders[index].Acknowledgement === 'Rejected') {
      updatedOrders[index].ReturnStatus = ''; 
    } else {
      updatedOrders[index].ReturnStatus = value;
    }
    setOrders(updatedOrders);
  };

  return (
    <div className="orders-container">
      <h2>Return Orders</h2>
      <div className="scrollable-table">
        <table className="unique-active-orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Customer Email</th>
              <th>PickUp Address</th>
              <th>Customer Availability</th>
              <th>Acknowledgement</th>
              <th>Return Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan="7">No active orders found</td></tr>
            ) : (
              orders.map((order, index) => (
                <tr key={index}>
                  <td>{order['Order ID']}</td>
                  <td>{order['Customer ID']}</td>
                  <td>{order['Customer Email']}</td>
                  <td>{order['PickUp Address']}</td>
                  <td>{order['Customer Availability']}</td>
                  <td>
                    <select
                      value={order.Acknowledgement || ''}
                      onChange={(e) => handleAcknowledgementChange(index, e.target.value)}
                      className={`ack-dropdown ${order.ackClass || ''}`}
                    >
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={order.ReturnStatus || ''}
                      onChange={(e) => handleReturnStatusChange(index, e.target.value)}
                      disabled={order.Acknowledgement === 'Rejected'}
                      className="return-status-dropdown"
                    >
                      <option value="">Select</option>
                      <option value="Successful">Successful</option>
                      <option value="In Process">In Process</option>
                    </select>
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

export default ReturnOrders;
