import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Pressable,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AxiosInstance from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { useTogglePasswordVisibility } from "../../hook/useTogglePasswordVisibility";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { armazenarDadosUsuario } = useContext(DataContext);
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

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
      }
    } catch (error) {
      setError("Por favor verifique as informações fornecidas");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        style={styles.logo}
        source={{
          uri: "https://images-ext-2.discordapp.net/external/niv4wChJYjYIWY1bQzLMuIv-dBq-CtS24o3pgEYxzT8/https/upload.wikimedia.org/wikipedia/commons/thumb/7/77/Letter_x.svg/569px-Letter_x.svg.png?width=503&height=905",
        }}
      />
      <Text style={styles.titleX}>Livraria X</Text>
      <Text style={styles.title}>Bem-Vinde</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
      ></TextInput>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={setSenha}
          secureTextEntry={passwordVisibility}
          value={senha}
        ></TextInput>
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            style={styles.eye}
            size={22}
          />
        </Pressable>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text>Login</Text>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
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

  titleX: {
    color: "purple",
    fontSize: 40,
    fontWeight: "bold",
  },

  logo: {
    width: 100,
    height: 100,
  },

  title: {
    color: "purple",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 30,
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

  eye: {
    position: "absolute",
    left: 185,
    bottom: 21,
  },

  error: {
    color: "red",
  },
});

export default Login;
