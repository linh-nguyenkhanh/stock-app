import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import finnHub from "../api/finnHub.js";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { WatchListContext } from "../context/watchListContext.jsx";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import "../App.css";

const StockList = () => {
  const [stock, setStock] = useState();
  const { watchList } = useContext(WatchListContext);
  const navigate = useNavigate();

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;
  };

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

        const dataExtract = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        if (isMounted) {
          setStock(dataExtract);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);

  const handleStockSelect = (stockId) => {
    navigate(`detail/${stockId}`);
  };

  return (
    <TableContainer>
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Last</Th>
            <Th>Change</Th>
            <Th>Change%</Th>
            <Th>High</Th>
            <Th>Low</Th>
            <Th>Open</Th>
            <Th>Pclose</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stock?.map((stockData) => {
            return (
              <Tr
                style={{ cursor: "pointer" }}
                onClick={() => handleStockSelect(stockData.symbol)}
                key={stockData.symbol}
              >
                <Th>{stockData.symbol}</Th>
                <Td>{stockData.data.c}</Td>
                <Td className={`text-${changeColor(stockData.data.id)}`}>
                  {stockData.data.d} {renderIcon(stockData.data.id)}
                </Td>
                <Td className={`text-${changeColor(stockData.data.id)}`}>
                  {stockData.data.dp} {renderIcon(stockData.data.id)}
                </Td>

                <Td>{stockData.data.h}</Td>
                <Td>{stockData.data.l}</Td>
                <Td>{stockData.data.o}</Td>
                <Td>{stockData.data.pc}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StockList;
