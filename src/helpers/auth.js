import AsyncStorage from '@react-native-community/async-storage';
import {resetRequest} from '../api/index';

export const storeUserLoginData = async (data) => {
  const initialData = await AsyncStorage.getItem('user_stats');
  const userData = JSON.parse(initialData);
  const newData = {
    ...userData,
    ...data,
  };

  await AsyncStorage.setItem('user_stats', JSON.stringify(newData));
  await resetRequest();
  return;
};

export const removeUserData = async (fieldsArray) => {
  if (!fieldsArray) {
    return await AsyncStorage.removeItem('user_stats');
  }
  const initialData = await AsyncStorage.getItem('user_stats');
  const userData = {...JSON.parse(initialData)};
  fieldsArray.forEach((key) => {
    delete userData[key];
  });
  await AsyncStorage.setItem('user_stats', JSON.stringify(userData));
  await resetRequest();
};

export const retrieveUserData = async () => {
  const storedUserData = await AsyncStorage.getItem('user_stats');
  return JSON.parse(storedUserData);
};
