import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { save, getValueFor } from "../../services/DataService";
import { DataContext } from "../../context/DataContext";
import AxiosInstance from "../../api/AxiosInstance";
import { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const Favorites = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosLivro, setDadosLivro] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getTodosLivros();
    })
  );

  const getTodosLivros = async () => {
    const favoritoesx = await getValueFor("livros");
    const favoritosParse = favoritoesx == null ? [] : JSON.parse(favoritoesx);

    const livrosFev = [];

    for (const id of favoritosParse) {
      const resultado = await AxiosInstance.get(`/livros/${id}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      livrosFev.push(resultado.data);
    }

    setDadosLivro(livrosFev);
  };

  const deleteLivro = async (key, value) => {
    await save(key, value);
  };

  return (
    <View style={styles.container}>
      <Text>Favoritos</Text>
      <FlatList
        data={dadosLivro}
        keyExtractor={(item) => item.codigoLivro}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nomeLivro}</Text>
            <TouchableOpacity
              onPress={() => {
                deleteLivro("livros", item.codigoLivro);
              }}
            >
              <Text>Deletar dos Favoritos</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
});

export default Favorites;
