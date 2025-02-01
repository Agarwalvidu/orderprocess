import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from "./components/dashboard/dash";
import { CustomerOrders } from "./components/sustain/sustain";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sustain" element={<CustomerOrders />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
