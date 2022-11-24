import React, { useState, useEffect } from "react";
import finnHub from "../api/finnHub";

import { Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

const AutoCompletePage = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const renderDropDown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul className={`dropdown-menu ${dropDownClass}`}>
        {results.map((result) => {
          return (
            <li className="item-dropdown" key={result.symbol}>
              {result.description} ({result.symbol})
            </li>
          );
        })}
      </ul>
    );
  };
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          setResults(response.data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <Flex p="10" justify="center" align="center" w="full">
      <FormControl w="60">
        <FormLabel htmlFor="search" fontSize="lg">
          Stock Search
        </FormLabel>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="filled"
          bg="#cfd1d266"
          type="text"
          id="search"
          placeholder="Search"
          w="100%"
          h="2rem"
          p="1.2em"
          borderRadius="6px"
        />
        {renderDropDown()}
      </FormControl>
    </Flex>
  );
};

export default AutoCompletePage;
