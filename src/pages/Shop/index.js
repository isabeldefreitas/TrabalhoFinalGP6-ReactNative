import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import {
  getValueFor,
  save,
  delLivro,
  getItemCount,
} from "../../services/DataService";
import { Loader } from "../Loader";

const ShopCart = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosLivro, setDadosLivro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      getTodosLivros();
    })
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
      setIsLoading(false);
      livrosBuy.push(resultado.data);
    }

    setDadosLivro(livrosBuy);
  };

  const deleteLivro = async (key, value) => {
    await save(key, value);
  };

  return (
    <View style={styles.container}>
      {dadosLivro.length === 0 ? (
        <Text>Nenhum item Adicionado ao carrinho</Text>
      ) : (
        <View>
          <Text>Carrinho</Text>
          {getContent()}
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
    backgroundColor: "pink",
  },

  titleStyle: {
    fontSize: 20,
    marginTop: 200,
    marginLeft: 140,
  },
});

export default ShopCart;
