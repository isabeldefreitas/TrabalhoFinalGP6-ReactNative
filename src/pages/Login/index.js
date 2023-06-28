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
import { Loader } from "../Loader/index";

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
        <Loader style={styles.styleLoader} />;
        navigation.navigate("Livraria");
      } else {
      }
    } catch (error) {
      setError("Por favor, verifique as informações fornecidas!" + error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        style={styles.logo}
        source={{
          uri: "https://media.discordapp.net/attachments/1081311975247716473/1123705326433218670/image.png?width=671&height=671",
        }}
      />

      <Text style={styles.title}>Bem-Vinde</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
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
    backgroundColor: "#4d2624",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 250,
    height: 250,
  },

  title: {
    color: "#794a33",
    fontSize: 25,
    fontWeight: "bold",
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

  styleLoader: {
    alignItems: "bottom",
  },
});

export default Login;
