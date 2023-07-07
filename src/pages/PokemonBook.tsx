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

const PokemonBook = () => {
  const [pokemonPageData, setPokemonPageData] = useState<PokemonData>();

  const getPokemonPageData = async () => {
    const _pokemonPageData = await fetch(
      "https://poke-iota-ten.vercel.app/api/pokedex"
    ).then((res) => res.json());
    setPokemonPageData(_pokemonPageData);
  };
  useEffect(() => {
    getPokemonPageData();
  }, []);

  return (
    <Box w="42%" margin="0 auto">
      <Heading as="h1" m="60px 0 30px">
        ポケモン図鑑
      </Heading>
      <Divider />
      <Flex m="30px 0 20px">
        <Input placeholder="ピカチュウ" mr="20px" />
        <Button>検索</Button>
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
            {pokemonPageData?.items.map((item) => (
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
