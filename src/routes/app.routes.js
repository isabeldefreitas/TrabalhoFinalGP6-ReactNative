import React, { useContext, useEffect } from "react";
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
import { Feather } from "@expo/vector-icons";
import Favorites from "../pages/Favoritos";
import { getItemCount, getValueFor } from "../services/DataService";
import { Text, View } from "react-native";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { DataFav, DataFavoritos } from "../context/DataFav";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const { valor, valorBuy } = useContext(DataFav);
  const { valorFav, valorFavs } = useContext(DataFav);

  useEffect(() => {
    valor();
    valorFav();
  }, []);
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Início"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Editoras"
        component={Editoras}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favorites}
        options={{
          tabBarBadge: valorFavs !== 0 ? valorFavs : null,
          tabBarBadgeStyle: {
            backgroundColor: "#87CEEB",
            color: "black",
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={ShopCart}
        options={{
          tabBarBadge: valorBuy !== 0 ? valorBuy : null,
          tabBarBadgeStyle: {
            backgroundColor: "#87CEEB",
            color: "black",
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Sair"
        component={Logout}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="log-out" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <DataProvider>
      <DataFavoritos>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#54C7FF",
              },
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 25,
                color: "#fff",
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
              name="Livraria"
              component={BottomNavigation}
            />
            <Stack.Screen name="Livro" component={SelectedLivro} />
            <Stack.Screen name="Editora" component={SelectedEditora} />
          </Stack.Navigator>
        </NavigationContainer>
      </DataFavoritos>
    </DataProvider>
  );
}
