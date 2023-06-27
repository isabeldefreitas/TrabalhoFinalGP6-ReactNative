import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const ShopCart = () => {
  return (
    <View style={styles.container}>
      <Text>Carrinho</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
});

export default ShopCart;
