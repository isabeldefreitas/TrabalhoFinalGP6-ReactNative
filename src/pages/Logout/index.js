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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleLogOut()} style={styles.button}>
        <Text>Text</Text>
      </TouchableOpacity>
    </View>
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
});

export default Logout;
