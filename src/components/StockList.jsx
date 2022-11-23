import React, { useState, useEffect } from "react";
import finnHub from "../api/finnHub.js";
const StockList = () => {
  const [stock, setStock] = useState();
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        console.log(responses);
      const dataExtract = responses.map(response => {
        return{
          data: response.data,
          symbol: response.config.params.symbol
        }  
        })
        if (isMounted) {
          setStock(dataExtract);
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
