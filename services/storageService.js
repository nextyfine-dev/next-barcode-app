import AsyncStorage from "@react-native-async-storage/async-storage";
import catchAsync from "../utils/catchAsync";

export const getStorage = catchAsync(async (storage) => {
  const values = await AsyncStorage.getItem(storage);
  return values != null ? JSON.parse(values) : null;
});

export const setStorage = catchAsync(async (storage, value) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(storage, jsonValue);
});
