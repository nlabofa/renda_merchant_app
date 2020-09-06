/* eslint-disable no-unused-vars */
import React, {Fragment} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen = ({navigation}) => {
  const checkUser = async () => {
    const userData = await AsyncStorage.getItem('user_stats');
    const data = JSON.parse(userData);

    if (!userData) {
      return navigation.navigate('Onboard');
    } else {
      navigation.navigate('MainApp');
    }
  };

  checkUser();

  return <Fragment />;
};

export default LoadingScreen;
