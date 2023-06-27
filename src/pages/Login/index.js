import { StyleSheet, Text, View, TextInput, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { armazenarDadosUsuario } = useContext(DataContext);

  const handleLogin = async () => {
    try {
      const resultado = await AxiosInstance.post("/auth/signin", {
        username: email,
        password: senha,
      });
      if (resultado.status === 200) {
        var jwtToken = resultado.data;
        armazenarDadosUsuario(jwtToken["accessToken"]);

        navigation.navigate("Home");
      } else {
        alert("erro ao realizar o login");
      }
    } catch (error) {
      alert("erro duranteo processo de login: " + error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Text style={styles.title}>Bem-Vinde</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setSenha}
        secureTextEntry={true}
        value={senha}
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "purple",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 200,
  },

  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    justifyContent: "center",
    width: 150,
    borderRadius: 5,
    margin: 10,
  },
});

export default Login;
