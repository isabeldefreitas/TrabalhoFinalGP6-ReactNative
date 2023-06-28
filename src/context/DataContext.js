import jwt_decode from "jwt-decode";
import React, { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [dadosUsuario, setDadosUsuario] = useState("");
  const [dadosLivro, setDadosLivro] = useState("");

  const armazenarDadosUsuario = (jwt) => {
    var jwtDecodificado = jwt_decode(jwt);

    var usuario = jwtDecodificado.user;
    usuario = JSON.parse(usuario);

    setDadosUsuario({
      id: usuario?.id,
      nome: usuario?.username,
      email: usuario?.email,
      token: jwt,
    });
  };

  const armazenarDadosLivro = () => {
    setDadosLivro({
      id: livros?.codigoLivro,
      nome: livros?.nomeLivros,
      imagem: livros?.img,
    });
  };

  return (
    <DataContext.Provider
      value={{
        dadosUsuario,
        armazenarDadosUsuario,
        setDadosUsuario,
        dadosLivro,
        armazenarDadosLivro,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
