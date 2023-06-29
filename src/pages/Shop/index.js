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

const ShopCart = () => {
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
  };

  return (
    <View style={styles.container}>
      {dadosLivro.length === 0 ? (
        <Text>Nenhum item Adicionado ao carrinho</Text>
      ) : (
        <View style={styles.realContainer}>
          <Text style={styles.title}>Carrinho:</Text>
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
                      deleteLivro("livrosBuy", item.codigoLivro);
                    }}
                  >
                    <EvilIcons name="trash" size={30} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={() => {
              delLivro("livrosBuy");
            }}
          >
            <Text>DELETAR TUDO</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AE8BF4",
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

  flatListUni: {
    backgroundColor: "#161212",
    alignItems: "center",
    margin: 5,
    gap: 5,
    width: 220,
    borderRadius: 10,
  },

  livroTitle: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  title: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 30,
    color: "#794a33",
  },

  livroImagem: {
    width: 130,
    height: 200,
  },

  botao: {
    marginBottom: 10,
    backgroundColor: "#614e41",
    padding: 10,
    borderRadius: 10,
  },
});

export default ShopCart;
