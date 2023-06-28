import {
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../../context/DataContext";
import { useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

import { useContext, useEffect } from "react";

const Editoras = () => {
  const { dadosUsuario } = useContext(DataContext);
  const [dadosEditora, setDadosEditora] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator style={styles.loading} size="large" />;
    }
  };

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

  useEffect(() => {
    getTodasEditoras();
  }, []);

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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.EditorasContainer}>
          {getContent()}
          <FlatList
            style={styles.flatList}
            data={dadosEditora}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Editora item={item} />}
            keyExtractor={(item) => item.codigoEditora}
          />
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

  loading: {
    alignItems: "center",
    justifyContent: "center",
  },

  EditorasContainer: {
    flex: 1,
    alignItems: "center",
  },

  flatList: {
    flexGrow: 0,
  },

  title: {
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "magenta",
  },

  categorieContainer: {
    padding: 10,
  },

  categorie: {
    backgroundColor: "purple",
    borderRadius: 5,
    padding: 30,
    width: 130,
    height: 130,
  },
});

export default Editoras;
