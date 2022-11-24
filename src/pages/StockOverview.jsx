import React from "react";
import AutoComplete from "../components/AutoCompletePage";
import StockList from "../components/StockList";
const StockOverview = () => {
  return (
    <div>
      StockOverview
      <AutoComplete />
      <StockList />
    </div>
  );
};

export default StockOverview;
