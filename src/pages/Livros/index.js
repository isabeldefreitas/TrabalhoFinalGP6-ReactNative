import { useState } from "react";
import { save, addItem } from "../../services/DataService";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
} from "react-native";

const SelectedLivro = ({ route }) => {
  const selectedLivroData = route.params;

  const saveLivro = async (key, value) => {
    await addItem(key, value);
  };

  const saveLivroBuy = async (key, value) => {
    await addItem(key, value);
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
