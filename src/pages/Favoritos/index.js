import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  Image,
} from "react-native";
import {
  save,
  getValueFor,
  delLivro,
  deleteItem,
} from "../../services/DataService";
import { DataContext } from "../../context/DataContext";
import AxiosInstance from "../../api/AxiosInstance";
import { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { Loader } from "../Loader";

const Favorites = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosLivro, setDadosLivro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getTodosLivros();
    }, [])
  );

  const getContent = () => {
    if (isLoading) {
      return <Loader />;
    }
  };

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
    setIsLoading(false);

    setDadosLivro(livrosFev);
  };

  const deleteLivro = async (key, value) => {
    await deleteItem(key, value);
    getTodosLivros();
  };

  return (
    <View style={styles.container}>
      {dadosLivro.length === 0 ? (
        <Text>Nenhum Livro Adicionado aos Favoritos</Text>
      ) : (
        <View style={styles.realContainer}>
          <Text style={styles.title}>Favoritos:</Text>
          {getContent()}
          <FlatList
            data={dadosLivro}
            keyExtractor={(item) => item.codigoLivro}
            renderItem={({ item }) => (
              <View style={styles.flatList}>
                <Text>{item.nomeLivro}</Text>
                <Image
                  style={styles.livroImagem}
                  source={{ uri: `data:image/png;base64,${item.img}` }}
                />
                <TouchableOpacity
                  style={styles.botao}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
    alignItems: "center",
  },

  realContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  flatList: {
    alignItems: "center",
    gap: 10,
  },

  botao: {
    marginBottom: 10,
  },

  title: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 30,
  },

  livroImagem: {
    width: 100,
    height: 150,
  },
});

export default Favorites;
