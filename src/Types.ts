export type PokemonData = {
  total: number;
  items: {
    abilities: string[];
    classification: string;
    description: string;
    height: number;
    name: string;
    no: number;
    types: string[];
    weight: number;
  }[];
};

export type filterPokemonData = {
  abilities: string[];
  classification: string;
  description: string;
  height: number;
  name: string;
  no: number;
  types: string[];
  weight: number;
}[];

export type PokemonDetailData = {
  abilities: string[];
  classification: string;
  description: string;
  height: number;
  name: string;
  no: number;
  types: string[];
  weight: number;
};
