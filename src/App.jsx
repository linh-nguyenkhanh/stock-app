import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockDetail from "./pages/StockDetail";
import StockOverView from "./pages/StockOverview";

import "./App.css";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StockOverView />} />
          <Route path="/detail/:stock" element={<StockDetail />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
