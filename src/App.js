import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from "./components/dashboard/dash";
import { CustomerOrders } from "./components/sustain/sustain";
import { Inventory } from "./components/Inventory/inventory";
import Layout from "./components/dashboard/toggle";
import OrdersTable from "./components/activeorder/activeorder";

function App() {
  return (
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sustain" element={<CustomerOrders />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/orders" element={<OrdersTable />} />
    </Routes>
    </Layout>
  </BrowserRouter>
  );
}

export default App;
