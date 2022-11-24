import React, { useState, useEffect } from "react";
import finnHub from "../api/finnHub.js";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import "../App.css";
const StockList = () => {
  const [stock, setStock] = useState();
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

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
        console.log(dataExtract);
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
              <Tr key={stockData.symbol}>
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
