import React, { useState } from "react";
import { Flex, FormControl, FormLabel } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

const AutoCompletePage = () => {
  const [search, setSearch] = useState("");
  return (
    <Flex p="10" justify="center" align="center" w="full">
      <FormControl w="60">
        <FormLabel htmlFor="search" fontSize="md">
          Stock Search
        </FormLabel>
        <AutoComplete openOnFocus>
          <AutoCompleteInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="filled"
            bg="rgba(145,158,171,0.4)"
            type="text"
            id="search"
            placeholder="Search"
            w="100%"
            h="2rem"
            p="1.2em"
            borderRadius="6px"
            autoComplete="off"
          />
          <AutoCompleteList></AutoCompleteList>
        </AutoComplete>
      </FormControl>
    </Flex>
  );
};

export default AutoCompletePage;
