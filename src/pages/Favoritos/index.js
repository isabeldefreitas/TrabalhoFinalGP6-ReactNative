import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { deleteItem, getValueFor } from "../../services/DataService";
import { Loader } from "../Loader";
import { DataFav } from "../../context/DataFav";

const Favorites = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosLivro, setDadosLivro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { valorFav } = useContext(DataFav);

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
    valorFav();
  };

  return (
    <View style={styles.container}>
      {dadosLivro.length === 0 ? (
        <Text style={styles.none}>
          Nenhum Livro Adicionado aos Favoritos 😒
        </Text>
      ) : (
        <View style={styles.realContainer}>
          <Text style={styles.title}>Favoritos:</Text>
          {getContent()}
          <FlatList
            data={dadosLivro}
            keyExtractor={(item) => item.codigoLivro}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.flatList}>
                <View style={styles.flatListUni}>
                  <Text style={styles.livroTitle}>{item.nomeLivro}</Text>
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
                    <MaterialCommunityIcons
                      name="star-off"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
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

  none: {
    marginTop: 25,
    fontSize: 65,
  },

  realContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  flatList: {
    alignItems: "center",
    gap: 10,
  },

  flatListUni: {
    backgroundColor: "white",
    alignItems: "center",
    margin: 5,
    gap: 5,
    width: 220,
    borderRadius: 10,
    height: 320,
  },

  livroTitle: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 15,
  },

  botao: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    width: 130,
    borderRadius: 10,
  },

  title: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 30,
  },

  livroImagem: {
    width: 150,
    height: 220,
    borderColor: "black",
  },
});

export default Favorites;
