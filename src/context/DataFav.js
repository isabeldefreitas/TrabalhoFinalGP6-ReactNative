import { createContext, useState } from "react";
import "react-native-gesture-handler";
import { getItemCount } from "../services/DataService";

export const DataFav = createContext({});

export const DataFavoritos = ({ children }) => {
  const [valorBuy, setValorBuy] = useState(0);
  const [valorFavs, setValorFav] = useState(0);

  async function valor() {
    const valorCarrinho = await getItemCount("livrosBuy");
    if (valorCarrinho !== null && valorCarrinho !== undefined) {
      console.log(valorCarrinho);
      setValorBuy(valorCarrinho);
    } else {
      setValorBuy(0);
    }
  }

  async function valorFav() {
    const valorCarrinho = await getItemCount("livros");
    if (valorCarrinho !== null && valorCarrinho !== undefined) {
      console.log(valorCarrinho);
      setValorFav(valorCarrinho);
    } else {
      setValorFav(0);
    }
  }

  return (
    <DataFav.Provider
      value={{
        valorBuy,
        valorFav,
        valor,
        valorFavs,
      }}
    >
      {children}
    </DataFav.Provider>
  );
};
