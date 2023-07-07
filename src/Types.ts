export interface PokemonData {
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
}
