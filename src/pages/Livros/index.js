import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const SelectedLivro = ({ route }) => {
  const selectedLivroData = route.params;
  console.log(selectedLivroData.nomeAutor);
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
});

export default SelectedLivro;
