/* eslint-disable eqeqeq */
//import * as actionTypes from '../types/login';
import {AuthRequest} from '../api/index';
// import {
//   storeUserLoginData,
//   removeUserData,
//   retrieveUserData,
// } from '../helpers/auth';
//import {getBusinessAccounts, resetStore} from './account';
import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';
import NavigationService from '../helpers/NavigationService';
//import store from '../store/index';
//import { alertModal } from '../actions/alert';

// const loadStart = () => {
//   return {
//     type: actionTypes.LOAD_START,
//   };
// };

// const loadEnd = () => {
//   return {
//     type: actionTypes.LOAD_END,
//   };
// };

// const clearError = () => {
//   return {
//     type: actionTypes.CLEAR_ERROR,
//   };
// };
export const getRoles = () => async () => {
  const response = await AuthRequest.getRoles();
  return response.data;
};

// export const handleLogin = (data) => async (dispatch) => {
//   dispatch(loadStart());
//   dispatch(clearError());

//   const payload = {
//     username: data.email,
//     password: data.password,
//   };
//   const response = await AuthRequest.login(payload);

//   //RUN THIS CHECK FOR DIRECT LOGIN
//   if (response.status_code == 200) {
//     //ONLY USERTYPE ECOSYSTEM CAN USE THE MOBILE APP AT THE MOMENT
//     if (response.user_type.toLowerCase() !== 'ecosystem') {
//       throw new Error(
//         'Whoops! Team member login not allowed. Please use the web app',
//       );
//     } else {
//       const userData = {
//         token: response.token,
//         email: response.email,
//         first_name: response.first_name,
//         last_name: response.last_name,
//         user_type: response.user_type,
//       };
//       await storeUserLoginData(userData);
//       UserRequest.addNotificationDevice();

//       const {redirected = false} = await postLoginCheck(
//         response,
//         dispatch,
//         'login',
//       );

//       if (!redirected) {
//         if (response && response.biz_creation) {
//           NavigationService.reset('Dashboard');
//         } else {
//           NavigationService.reset('RegisterBusiness');
//         }
//       }
//     }
//   }
//   //RUN THIS CHECK FOR 2FA ENABLED LOGIN
//   else if (response.status_code == 201) {
//     if (response.otp_type) {
//       return response;
//     }
//   }
// };

// export const grantAccessWithPin = (pin) => async (dispatch) => {
//   try {
//     dispatch(loadStart());
//     const userInfo = await retrieveUserData();
//     const payload = {
//       access_code: pin,
//       rep_email: userInfo.email,
//     };
//     const response = await AuthRequest.grantAccessWithPin(payload);
//     return await postLoginCheck(response, dispatch);
//   } catch (e) {
//     return Promise.reject(e);
//   }
// };

// export const createPin = (newPin) => async () => {
//   const payload = {
//     access_code: newPin,
//   };
//   return await AuthRequest.createPin(payload);
// };

// export const changePin = (newPin) => async () => {
//   try {
//     const response = await AuthRequest.changePin(newPin);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

// export const logout = () => async (dispatch) => {
//   dispatch(resetStore());
//   AsyncStorage.removeItem('isUserLoggedIn');
//   AsyncStorage.removeItem('mfaType');
//   removeUserData([
//     'token',
//     'biz_account_id',
//     'email',
//     'first_name',
//     'last_name',
//     'isPinCreated',
//   ]);
//   Intercom.logout();
//   Mixpanel.reset();
//   NavigationService.reset('Login');
//   try {
//     LockScreenActions.unlockApp();
//   } catch (err) {}
//   await AuthRequest.logout();
// };
