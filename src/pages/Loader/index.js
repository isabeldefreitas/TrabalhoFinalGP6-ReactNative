import { View, ActivityIndicator } from 'react-native';

export const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = {
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
