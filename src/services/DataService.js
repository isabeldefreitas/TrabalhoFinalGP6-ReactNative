import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  try {
    let storedValue = await getValueFor(key);
    let existingData = storedValue ? JSON.parse(storedValue) : [];
    if (existingData.includes(value)) {
      return;
    }
    let newData = [...existingData, value];
    await SecureStore.setItemAsync(key, JSON.stringify(newData));
  } catch (error) {
    console.log("Erro ao persistir dados:" + error);
  }
}

async function getValueFor(key) {
  let result = null;

  try {
    result = await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Erro ao recuperar dados:" + error);
  }
  return result;
}

const delLivro = async (key) => {
  await SecureStore.deleteItemAsync(key);
};

export { save, getValueFor, delLivro };
