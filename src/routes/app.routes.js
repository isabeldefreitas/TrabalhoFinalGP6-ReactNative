import React from "react";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DataProvider } from "../context/DataContext";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Logout from "../pages/Logout";
import Editoras from "../pages/EditorasPage";
import SelectedLivro from "../pages/Livros";
import SelectedEditora from "../pages/Editoras";
import ShopCart from "../pages/Shop";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Livraria" component={Home} />
      <Tab.Screen name="Editoras" component={Editoras} />
      {/* <Tab.Screen name="Favoritos" component={Favorites}/> */}
      <Tab.Screen name="Carrinho" component={ShopCart} />
      <Tab.Screen name="Deslogar" component={Logout} />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#DA70D6",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            options={{ headerLeft: null }}
            name="Home"
            component={BottomNavigation}
          />
          <Stack.Screen name="Livro" component={SelectedLivro} />
          <Stack.Screen name="Editora" component={SelectedEditora} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
