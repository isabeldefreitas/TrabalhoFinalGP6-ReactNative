import { useState } from "react";
import { save } from "../../services/DataService";

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
  const [isPressFav, setIsPressFav] = useState(false);
  const [isPressShop, setIsPressShop] = useState(false);
  const [buttonTextFav, setButtonTextFav] = useState(false);
  const [buttonTextShop, setButtonTextShop] = useState(false);

  const saveLivro = async (key, value) => {
    await save(key, value);
  };

  const saveLivroBuy = async (key, value) => {
    await save(key, value);
  };

  const handleClickFav = () => {
    setIsPressFav(!isPressFav);
    setButtonTextFav(!buttonTextFav);
  };

  const handleClickShop = () => {
    setIsPressShop(!isPressShop);
    setButtonTextShop(!buttonTextShop);
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
          <TouchableOpacity
            style={isPressFav ? styles.btnPress : styles.btnNormal}
            onPress={() => {
              saveLivro("livros", selectedLivroData.codigoLivro);
              handleClickFav();
            }}
          >
            <Text>
              {buttonTextFav
                ? "Adicionado aos Favoritos"
                : "Adicionar aos Favoritos"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isPressShop ? styles.btnPress : styles.btnNormal}
            onPress={() => {
              saveLivroBuy("livrosBuy", selectedLivroData.codigoLivro);
              handleClickShop();
            }}
          >
            <Text>
              {buttonTextShop
                ? "Adicionado ao Carrinho"
                : "Adicionar ao Carrinho"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
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

  btnNormal: {
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
  btnPress: {
    backgroundColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
  },
});

export default SelectedLivro;
