import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { Loader } from "../Loader";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

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
        <View style={styles.editorasTitleContainer}>
          <Entypo name="book" size={24} color="black" />
          <Text style={styles.editorasTitle}>Editoras</Text>
        </View>

        {getContent()}
        <FlatList
          style={styles.flatList}
          data={dadosEditora}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Editora item={item} />}
          keyExtractor={(item) => item.codigoEditora}
        />
        <View style={styles.editorasTitleContainer}>
          <Entypo name="open-book" size={24} color="black" />
          <Text style={styles.editorasTitle}>Livros</Text>
        </View>
        {getContent()}
        <FlatList
          style={styles.flatList}
          data={dadosLivro}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Livro item={item} />}
          keyExtractor={(item) => item.codigoLivro}
        />
        <View style={styles.editorasTitleContainer}>
          <Feather name="trending-up" size={24} color="black" />
          <Text style={styles.editorasTitle}>Destaques</Text>
        </View>
        <View style={styles.destaqueContainer}>
          <Image
            style={styles.destaques}
            source={{
              uri: "https://images-ext-1.discordapp.net/external/GxtLXpqFfxNj-KWMGkTMJx1pP_NBb5s8LAJXFzu3uXk/https/m.media-amazon.com/images/I/81p6nHmmNaL.jpg?width=849&height=671",
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
    backgroundColor: "#87CEEB",
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
    marginBottom: 7,
  },

  editorasTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    width: 370,
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
    marginBottom: 10,
    alignItems: "center",
    margin: 10,
  },

  destaques: {
    height: 260,
    width: 300,
    borderRadius: 15,
  },

  destaque: {
    fontSize: 24,
  },
});

export default Home;
