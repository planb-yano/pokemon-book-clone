import React from "react";
import { Outlet } from "react-router-dom";

const PokemonIndex = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PokemonIndex;
