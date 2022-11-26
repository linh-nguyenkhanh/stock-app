import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockDetail from "./pages/StockDetail";
import StockOverView from "./pages/StockOverview";
import { WatchListContextProvider } from "./context/watchListContext";
import "./App.css";

function App() {
  return (
    <main>
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverView />} />
            <Route path="/detail/:stockID" element={<StockDetail />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
