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

        <TouchableOpacity style={styles.yesStyle} onPress={() => handleLogOut()}>
        <Text>Sim</Text>
      </TouchableOpacity>

      
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },

  button: {
    width: 200,
    height: 200,
  },

  titleStyle:{
    fontSize: 20,
    marginTop: 200,
    marginLeft: 140,
  },

  yesStyle:{
    fontSize: 20,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    width: 150,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 120,
  },

});

export default Logout;
