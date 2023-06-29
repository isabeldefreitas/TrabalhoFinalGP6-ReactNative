import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";

const SelectedEditora = ({ route }) => {
  const navigation = useNavigation();
  const { dadosUsuario } = useContext(DataContext);
  const selectedEditoraLivroData =
    route.params.selectedEditoraObj.listaLivrosDTO;

  async function goToLivros(livro) {
    await AxiosInstance.get(`livros/${livro.codigoLivro}`, {
      headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
    })
      .then((response) => {
        const livroResponse = response.data;

        const livroObj = {
          img: livroResponse.imagem,
          codigoLivro: livroResponse.codigoLivro,
          nomeLivro: livroResponse.nomeLivro,
          autorDTO: livroResponse.autorDTO,
          editoraDTO: livroResponse.editoraDTO,
        };

        navigation.navigate("Livro", livroObj);
      })
      .catch((error) => {
        console.log("erro na requsiição de livros: " + error);
      });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.bookContainer}>
          <Image
            style={styles.categorie}
            source={{
              uri: `data:image/png;base64,${route.params.selectedEditoraObj.img}`,
            }}
          />
          {selectedEditoraLivroData.map((livro) => (
            <TouchableOpacity
              key={livro.codigoLivro}
              onPress={() => goToLivros(livro)}
            >
              <View style={styles.cardBook}>
                <Image
                  style={styles.book}
                  source={{ uri: `data:image/png;base64,${livro.imagem}` }}
                />
                <Text style={styles.bookTitle}>{livro.nomeLivro}</Text>
              </View>
            </TouchableOpacity>
          ))}
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

  categorie: {
    borderRadius: 5,
    marginTop: 15,
    padding: 30,
    width: 100,
    height: 100,
  },

  cardBook: {
    margin: 10,
    alignItems: "center",
    backgroundColor: "white",
    height: 310,
    width: 200,
    borderRadius: 10,
  },

  bookContainer: {
    alignItems: "center",
  },

  book: {
    marginTop: 15,
    height: 250,
    width: 170,
  },
  bookTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 5,
    textAlign: "center",
    width: 150,
  },
});

export default SelectedEditora;
