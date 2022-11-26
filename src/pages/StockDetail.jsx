import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import finnHub from "../api/finnHub";

const StockDetail = () => {
  const [chartData, setCHartData] = useState();
  const { stock } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTimeToSeconds = Math.floor(date.getTime() / 1000);

      let oneDayAgo;
      if (date.getDay() === 6) {
        oneDayAgo = currentTimeToSeconds - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDayAgo = currentTimeToSeconds - 3 * 24 * 60 * 60;
      } else {
        oneDayAgo = currentTimeToSeconds - 24 * 60 * 60;
      }
      const oneWeekAgo = currentTimeToSeconds - 7 * 60 * 60 * 24;
      const oneYearAgo = currentTimeToSeconds - 365 * 60 * 60 * 24;
      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              stock,
              from: oneDayAgo,
              to: currentTimeToSeconds,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              stock,
              from: oneWeekAgo,
              to: currentTimeToSeconds,
              resolution: 60,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              stock,
              from: oneYearAgo,
              to: currentTimeToSeconds,
              resolution: "W",
            },
          }),
        ]);
        console.log(responses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <div>StockDetail {stock}</div>;
};

export default StockDetail;
