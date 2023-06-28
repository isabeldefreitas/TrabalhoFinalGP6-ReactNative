import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { save, getValueFor, delLivro } from "../../services/DataService";
import { DataContext } from "../../context/DataContext";
import AxiosInstance from "../../api/AxiosInstance";
import { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

const ShopCart = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosLivro, setDadosLivro] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getTodosLivros();
    })
  );

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

    setDadosLivro(livrosBuy);
  };

  const deleteLivro = async (key, value) => {
    await save(key, value);
  };

  return (
    <View style={styles.container}>
      <Text>Carrinho</Text>
      <FlatList
        data={dadosLivro}
        keyExtractor={(item) => item.codigoLivro}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nomeLivro}</Text>
            <TouchableOpacity
              onPress={() => {
                deleteLivro("livrosBuy", item.codigoLivro);
              }}
            >
              <Text>Deletar do Carrinho</Text>
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

  titleStyle: {
    fontSize: 20,
    marginTop: 200,
    marginLeft: 140,
  },
});

export default ShopCart;
