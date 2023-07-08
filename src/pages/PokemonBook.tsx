import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PokemonData } from "../Types";

type filterPokemonData = {
  abilities: string[];
  classification: string;
  description: string;
  height: number;
  name: string;
  no: number;
  types: string[];
  weight: number;
}[];

const PokemonBook = () => {
  const [pokemonAllData, setPokemonAllData] = useState<PokemonData>();
  const [pokemonPageData, setPokemonPageData] = useState<PokemonData>();
  const [filterPokemonPageData, setFilterPokemonPageData] =
    useState<filterPokemonData>();
  const [inputValue, setInputValue] = useState<string>("");

  const getPokemonAllData = async () => {
    const _pokemonAllData = await fetch(
      "https://poke-iota-ten.vercel.app/api/pokedex?limit=1009"
    ).then((res) => res.json());
    setPokemonAllData(_pokemonAllData);
  };

  const getPokemonPageData = async () => {
    const _pokemonPageData = await fetch(
      "https://poke-iota-ten.vercel.app/api/pokedex"
    ).then((res) => res.json());
    setPokemonPageData(_pokemonPageData);
  };
  useEffect(() => {
    getPokemonAllData();
    getPokemonPageData();
  }, []);

  const handleSearch = () => {
    if (inputValue === "") {
      setFilterPokemonPageData(pokemonPageData?.items);
    } else {
      const _filterPokemonPageData = pokemonAllData?.items.filter(
        (item) => item.name.indexOf(inputValue) !== -1
      );
      setFilterPokemonPageData(_filterPokemonPageData);
    }
  };

  return (
    <Box w="42%" margin="0 auto">
      <Heading as="h1" m="60px 0 30px">
        ポケモン図鑑
      </Heading>
      <Divider />
      <Flex m="30px 0 20px">
        <Input
          placeholder="ピカチュウ"
          mr="20px"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button onClick={handleSearch}>検索</Button>
      </Flex>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>NO.</Th>
              <Th>名前</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filterPokemonPageData
              ? filterPokemonPageData.map((item) => (
                  <Tr key={item.no}>
                    <Td>{item.no}</Td>
                    <Td>{item.name}</Td>
                  </Tr>
                ))
              : pokemonPageData?.items.map((item) => (
                  <Tr key={item.no}>
                    <Td>{item.no}</Td>
                    <Td>{item.name}</Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PokemonBook;
