import React from "react";
import { useParams } from "react-router-dom";
const StockDetail = () => {
  const { stock } = useParams();
  return <div>StockDetail {stock}</div>;
};

export default StockDetail;
