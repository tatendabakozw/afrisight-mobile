import * as SecureStore from "expo-secure-store";

export const saveItemToSecureStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getItemFromSecureStore = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};
