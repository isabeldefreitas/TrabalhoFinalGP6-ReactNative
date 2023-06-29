import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DataContext } from "../../context/DataContext";

const Logout = () => {
  const { setDadosUsuario } = useContext(DataContext);
  const navigation = useNavigation();

  const handleLogOut = () => {
    setDadosUsuario("");

    navigation.navigate("Login");
  };

  const pressAlert = () => {
    Alert.alert("Deslogar", "Você realmente quer sair? :(", [
      { text: "Sim", onPress: () => handleLogOut() },
      { text: "Não", onPress: () => {} },
    ]);
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Já vai embora? 😢</Text>

        <TouchableOpacity style={styles.yesStyle} onPress={() => pressAlert()}>
          <Text style={styles.text}>Deslogar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: 200,
    height: 200,
  },

  titleStyle: {
    fontSize: 20,
  },

  yesStyle: {
    fontSize: 20,
    alignItems: "center",
    backgroundColor: "#161212",
    padding: 10,
    width: 120,
    borderRadius: 5,
    marginTop: 20,
  },

  text: {
    fontWeight: "bold",
    color: "white",
  },
});

export default Logout;
