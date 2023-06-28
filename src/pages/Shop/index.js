import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const ShopCart = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Carrinho</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },

  titleStyle: {
    fontSize: 20,
    marginTop: 200,
    marginLeft: 140,
  },

});

export default ShopCart;
