import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  try {
    let storedValue = await getValueFor(key);
    let existingData = storedValue ? JSON.parse(storedValue) : [];

    if (existingData.includes(value)) {
      let newData = existingData.filter((item) => item !== value);
      await SecureStore.setItemAsync(key, JSON.stringify(newData));
    } else {
      let newData = [...existingData, value];
      await SecureStore.setItemAsync(key, JSON.stringify(newData));
    }
    let itemCount = await getItemCount(key);
    console.log("Number of items in SecureStore:", itemCount);
    return itemCount;
  } catch (error) {
    console.log("Error persisting data: " + error);
  }
}

async function getItemCount(key) {
  try {
    let updatedValue = await getValueFor(key);
    let updatedData = updatedValue ? JSON.parse(updatedValue) : [];
    return updatedData.length;
  } catch (error) {
    console.log("Error getting item count: " + error);
    return "0";
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

export { save, getValueFor, delLivro, getItemCount };
