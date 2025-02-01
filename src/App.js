import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from "./components/Dashboard/dash";
import {Inventory} from "./components/Inventory/inventory";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
