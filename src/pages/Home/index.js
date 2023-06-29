import { ScrollView } from "react-native";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Loader } from "../Loader";

const Home = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState([]);
  const [dadosLivro, setDadosLivro] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getContent = () => {
    if (isLoading) {
      return <Loader />;
    }
  };

  const Editora = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.categorieContainer}
      onPress={() => {
        navigation.navigate("Editora", {
          selectedEditoraObj: item,
        });
      }}
    >
      <Image
        style={styles.categorie}
        source={{ uri: `data:image/png;base64,${item.img}` }}
      />
    </TouchableOpacity>
  );

  const Livro = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.categorieContainer}
      onPress={() => {
        navigation.navigate("Livro", item);
      }}
    >
      <View style={styles.bookContainer}>
        <Image
          style={styles.book}
          source={{ uri: `data:image/png;base64,${item.img}` }}
        />
        <Text style={styles.bookTitle}>{item.nomeLivro}</Text>
      </View>
    </TouchableOpacity>
  );

  const getTodasEditoras = async () => {
    await AxiosInstance.get("/editoras", {
      headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
    })
      .then((resultado) => {
        setIsLoading(false);
        setDadosEditora(resultado.data);
      })
      .catch((error) => {
        console.log(
          "Ocorreu um erro ao recuperar os dados das editoras:" + error
        );
      });
  };

  const getTodosLivros = async () => {
    await AxiosInstance.get("/livros", {
      headers: { Authorization: `Bearer ${dadosUsuario?.token}` },
    })
      .then((resultado) => {
        setIsLoading(false);
        setDadosLivro(resultado.data);
      })
      .catch((error) => {
        console.log(
          "Ocorreu um erro ao recuperar os dados dos livros:" + error
        );
      });
  };

  useEffect(() => {
    getTodosLivros();
    getTodasEditoras();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.editorasTitle}>Editoras:</Text>

        {getContent()}
        <FlatList
          style={styles.flatList}
          data={dadosEditora}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Editora item={item} />}
          keyExtractor={(item) => item.codigoEditora}
        />

        <Text style={styles.editorasTitle}>Livros:</Text>
        {getContent()}
        <FlatList
          style={styles.flatList}
          data={dadosLivro}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Livro item={item} />}
          keyExtractor={(item) => item.codigoLivro}
        />
        <View style={styles.destaqueContainer}>
          <Text style={styles.editorasTitle}>Destaques:</Text>
          <Image
            style={styles.destaques}
            source={{
              uri: "https://images-ext-1.discordapp.net/external/SMOAVlLYTt0ndY5RPQKeppT-eOuJFk20OoFPVdrBaIQ/%3Fv%3D1615497113/https/cdn.shopify.com/s/files/1/2450/2191/products/81m5xSeW7YL_809x700.jpg",
            }}
          />
          <Text style={styles.destaque}>Box Completo Trono de vidro!</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AE8BF4",
  },

  loading: {
    alignItems: "center",
    justifyContent: "center",
  },

  flatList: {
    flexGrow: 0,
  },

  categorieContainer: {
    padding: 10,
  },

  editorasTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
    marginLeft: 10,
  },

  categorie: {
    borderRadius: 5,
    padding: 30,
    width: 130,
    height: 130,
  },

  bookContainer: {
    height: 305,
    width: 225,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
  },

  book: {
    marginTop: 10,
    height: 250,
    width: 170,
  },

  bookTitle: {
    marginTop: 5,
    fontWeight: "bold",
  },

  destaqueContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  destaques: {
    height: 260,
    width: 300,
  },

  destaque: {
    fontSize: 24,
  },
});

export default Home;
