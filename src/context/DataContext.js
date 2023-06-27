import jwt_decode from "jwt-decode";
import React, { createContext, useState } from "react";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [dadosUsuario, setDadosUsuario] = useState("");

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

  return (
    <DataContext.Provider
      value={{
        dadosUsuario,
        armazenarDadosUsuario,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
