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
      <Table size="md" variant="striped" colorScheme="teal">
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
                <Td>{stockData.data.d}</Td>
                <Td>{stockData.data.dp}</Td>
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
