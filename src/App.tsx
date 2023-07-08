import React from "react";
import "./App.css";
import PokemonBook from "./pages/PokemonBook";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import PokemonIndex from "./pages/PokemonIndex";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<PokemonIndex />}>
          <Route index element={<PokemonBook />} />
          <Route path=":pokemonId" element={<PokemonDetail />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
