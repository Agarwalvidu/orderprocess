import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from "./components/dashboard/dash";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
