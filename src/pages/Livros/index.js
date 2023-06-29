import { Feather, MaterialIcons } from "@expo/vector-icons";
import { addItem, getItemCount } from "../../services/DataService";
import { useContext } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DataFav } from "../../context/DataFav";

const SelectedLivro = ({ route }) => {
  const { valor, valorFav } = useContext(DataFav);
  const selectedLivroData = route.params;

  const saveLivro = async (key, value) => {
    await addItem(key, value);
    valorFav();
  };

  const saveLivroBuy = async (key, value) => {
    await addItem(key, value);
    valor();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.bookContainer}>
          <Image
            style={styles.book}
            source={{ uri: `data:image/png;base64,${selectedLivroData.img}` }}
          />
          <Text style={styles.bookTitle}>
            Livro: {selectedLivroData.nomeLivro}
          </Text>
          <Text>Autor: {selectedLivroData.autorDTO.nomeAutor}</Text>
          <Text>Editora: {selectedLivroData.editoraDTO.nomeEditora}</Text>
          <View style={styles.botaoContainer}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                saveLivro("livros", selectedLivroData.codigoLivro);
              }}
            >
              <Feather name="star" size={40} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => {
                saveLivroBuy("livrosBuy", selectedLivroData.codigoLivro);
              }}
            >
              <MaterialIcons name="add-shopping-cart" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
  },

  bookContainer: {
    alignItems: "center",
    marginTop: 40,
    gap: 5,
  },
  book: {
    height: 500,
    width: 340,
  },

  bookTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  botaoContainer: {
    flexDirection: "row",
    gap: 10,
  },

  botao: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export default SelectedLivro;
