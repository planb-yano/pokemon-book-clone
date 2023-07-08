export const hiraToKana = (text: string) => {
  return text.replace(/[\u3042-\u3093]/g, (m) =>
    String.fromCharCode(m.charCodeAt(0) + 96)
  );
};

export const getPokemonData = async (url: string) => {
  return await fetch(url).then((res) => res.json());
};
