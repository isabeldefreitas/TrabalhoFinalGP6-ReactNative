import { DataContext } from "../../context/DataContext";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const { setDadosUsuario } = useContext(DataContext);
  const navigation = useNavigation();

  const handleLogOut = () => {
    setDadosUsuario("");

    navigation.navigate("Login");
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Deseja sair?</Text>

        <TouchableOpacity
          style={styles.yesStyle}
          onPress={() => handleLogOut()}
        >
          <Text style={styles.text}>Sim</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4d2624",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: 200,
    height: 200,
  },

  titleStyle: {
    color: "#794a33",
    fontSize: 20,
  },

  yesStyle: {
    fontSize: 20,
    alignItems: "center",
    backgroundColor: "#161212",
    padding: 10,
    width: 150,
    borderRadius: 5,
    marginTop: 20,
  },

  text: {
    fontWeight: "bold",
    color: "#794a33",
  },
});

export default Logout;
