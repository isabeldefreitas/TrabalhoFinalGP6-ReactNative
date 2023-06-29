import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import {
  getValueFor,
  save,
  delLivro,
  getItemCount,
  deleteItem,
} from "../../services/DataService";
import { Loader } from "../Loader";
import { DataFav } from "../../context/DataFav";

const ShopCart = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosLivro, setDadosLivro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { valor } = useContext(DataFav);

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
    const buyesx = await getValueFor("livrosBuy");
    const buyParse = buyesx == null ? [] : JSON.parse(buyesx);

    const livrosBuy = [];

    for (const id of buyParse) {
      const resultado = await AxiosInstance.get(`/livros/${id}`, {
        headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
      });
      livrosBuy.push(resultado.data);
    }
    setIsLoading(false);

    setDadosLivro(livrosBuy);
  };

  const deleteLivro = async (key, value) => {
    await deleteItem(key, value);
    getTodosLivros();
    valor();
  };

  const deleteTodosLivros = async (key) => {
    await delLivro(key);
    getTodosLivros();
    valor();
  };

  return (
    <View style={styles.container}>
      {dadosLivro.length === 0 ? (
        <Text style={styles.none}>Nenhum item Adicionado ao carrinho 🥺</Text>
      ) : (
        <View style={styles.realContainer}>
          {getContent()}
          <Text style={styles.title}>Carrinho</Text>
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
                    style={styles.trashButton}
                    onPress={() => {
                      deleteLivro("livrosBuy", item.codigoLivro);
                    }}
                  >
                    <EvilIcons name="trash" size={35} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              deleteTodosLivros("livrosBuy");
            }}
          >
            <Text style={styles.delTxt}>Finalizar Compra</Text>
          </TouchableOpacity>
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
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
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
    height: 335,
  },

  livroTitle: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    fontSize: 18,
  },

  title: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },

  livroImagem: {
    width: 150,
    height: 220,
    borderColor: "black",
  },

  button: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    width: 130,
    borderRadius: 10,
    margin: 10,
  },

  delTxt: {
    fontSize: 15,
  },

  trashButton: {
    marginTop: 3,
    backgroundColor: "#7ca4bc",
    padding: 5,
    borderRadius: 10,
  },

  finalizarCompra: {
    backgroundColor: "#642402",
    padding: 25,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default ShopCart;
