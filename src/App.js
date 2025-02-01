import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from "./components/dashboard/dash";
import { CustomerOrders } from "./components/sustain/sustain";
import { Inventory } from "./components/Inventory/inventory";
import Layout from "./components/dashboard/toggle";

function App() {
  return (
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sustain" element={<CustomerOrders />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
    </Layout>
  </BrowserRouter>
  );
}

export default App;
