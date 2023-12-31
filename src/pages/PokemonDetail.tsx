import {
  Box,
  CircularProgress,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonData } from "../utils";
import { INITIALURL } from "../Constant";
import { PokemonDetailData } from "../Types";

const PokemonDetail = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonDetailData, setPokemonDetailData] =
    useState<PokemonDetailData>();

  const { pokemonId } = useParams();

  useEffect(() => {
    const fetchPokemonData = async () => {
      const _pokemonDetailData = await getPokemonData(
        `${INITIALURL}/${pokemonId}`
      );
      setPokemonDetailData(_pokemonDetailData);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

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
        <Box w="42%" margin="60px auto">
          <Link to="/">←ホーム</Link>
          <Heading as="h1" m="30px 0">
            {pokemonDetailData?.name}
          </Heading>
          <Divider />
          <TableContainer m="30px 0">
            <Table>
              <Thead>
                <Tr>
                  <Th>図鑑番号</Th>
                  <Th>重さ</Th>
                  <Th>高さ</Th>
                  <Th>特性</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{pokemonDetailData?.no}</Td>
                  <Td>{pokemonDetailData?.weight}</Td>
                  <Td>{pokemonDetailData?.height}</Td>
                  <Td>{pokemonDetailData?.abilities}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
          <Text>{pokemonDetailData?.description}</Text>
        </Box>
      )}
    </>
  );
};

export default PokemonDetail;
