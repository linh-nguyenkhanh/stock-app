import React, { useState, useEffect } from "react";
import finnHub from "../api/finnHub.js";
const StockList = () => {
  const [stock, setStock] = useState();
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/quote", {
          params: {
            symbol: "MSFT",
          },
        });
        console.log(response.data);
        if (isMounted) {
          setStock(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, []);

  return <div>StockList</div>;
};

export default StockList;
