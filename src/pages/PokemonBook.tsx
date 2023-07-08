import {
  Box,
  Button,
  CircularProgress,
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
import { PokemonData, filterPokemonData } from "../Types";
import { Link, Outlet } from "react-router-dom";
import { getPokemonData, hiraToKana } from "../utils";
import { INITIALURL } from "../Constant";

const PokemonBook = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonAllData, setPokemonAllData] = useState<PokemonData>();
  const [pokemonPageData, setPokemonPageData] = useState<PokemonData>();
  const [filterPokemonPageData, setFilterPokemonPageData] =
    useState<filterPokemonData>();
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // すべてのポケモンデータを取得
      const _pokemonAllData = await getPokemonData(`${INITIALURL}?limit=1009`);
      setPokemonAllData(_pokemonAllData);

      // 最初に表示させるポケモンデータを取得
      const _pokemonPageData = await getPokemonData(INITIALURL);
      setPokemonPageData(_pokemonPageData);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const handleSearch = () => {
    if (inputValue === "") {
      setFilterPokemonPageData(pokemonPageData?.items);
    } else {
      const _filterPokemonPageData = pokemonAllData?.items.filter(
        (item) => item.name.indexOf(hiraToKana(inputValue)) !== -1
      );
      setFilterPokemonPageData(_filterPokemonPageData);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress
          isIndeterminate
          display="flex"
          justifyContent="center"
          h="100%"
          w="100%"
          mt="60px"
          color="gray.600"
        />
      ) : (
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
                        <Td>
                          <Link to={`${item.no}`}>{item.no}</Link>
                        </Td>
                        <Td>
                          <Link to={`${item.no}`}>{item.name}</Link>
                        </Td>
                      </Tr>
                    ))
                  : pokemonPageData?.items.map((item) => (
                      <Tr key={item.no}>
                        <Td>
                          <Link to={`${item.no}`}>{item.no}</Link>
                        </Td>
                        <Td>
                          <Link to={`${item.no}`}>{item.name}</Link>
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Outlet />
        </Box>
      )}
    </>
  );
};

export default PokemonBook;
