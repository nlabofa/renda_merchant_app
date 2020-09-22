/* eslint-disable no-alert */
import * as actionTypes from '../types/auth-types';
import {AuthRequest} from '../api/index';
import {
  storeUserLoginData,
  removeUserData,
  retrieveUserData,
} from '../helpers/auth';
//import {getBusinessAccounts, resetStore} from './account';
import NavigationService from '../helpers/NavigationService';
//import store from '../store/index';
//import { alertModal } from '../actions/alert';

export const saveUserRoles = (data) => {
  return {
    type: actionTypes.SAVE_USER_ROLES,
    data,
  };
};
export const saveCategories = (data) => {
  return {
    type: actionTypes.SAVE_CATEGORIES,
    data,
  };
};
export const clearUserInfo = () => ({
  type: actionTypes.RESET_USER_INFO,
});
export const saveUserInfo = (data) => ({
  type: actionTypes.SAVE_USER_INFO,
  data,
});
export const saveBusinessTypes = (data) => {
  return {
    type: actionTypes.SAVE_BUSINESS_TYPES,
    data,
  };
};
export const getRoles = () => async (dispatch) => {
  //console.log('fetching');
  const response = await AuthRequest.getRoles();
  //console.log(response);
  dispatch(saveUserRoles(response.data));
  return response;
};
export const getCategories = () => async (dispatch) => {
  const response = await AuthRequest.getCategories();
  dispatch(saveCategories(response.data));
  return response;
};
export const getBusinessTypes = () => async (dispatch) => {
  const response = await AuthRequest.getBusinessTypes();
  dispatch(saveBusinessTypes(response.data));
  return response;
};
export const createAccount = (data) => async (dispatch) => {
  const response = await AuthRequest.createAccount(data);
  return response;
};
export const forgotPassword = (data) => async (dispatch) => {
  const response = await AuthRequest.forgotPassword(data);
  return response;
};
export const resetPassword = (data) => async (dispatch) => {
  const response = await AuthRequest.resetPassword(data);
  return response;
};
export const googleSignUp = (data) => async (dispatch) => {
  const response = await AuthRequest.googleSignUp(data);
  console.log(response);
  if (response.data.status === 200) {
    const userData = {
      token: response.data.data.accessToken,
      ...response.data.data.user,
    };
    console.log(userData);
    dispatch(saveUserInfo(userData));
    await storeUserLoginData(userData);
    NavigationService.navigate('MainApp');
  } else {
    alert(response.data.message);
    //NavigationService.navigate('Login');
  }
  return response;
};
export const verifyOTP = (data) => async (dispatch) => {
  const response = await AuthRequest.verifyOTP(data);
  console.log(response);
  if (response.data.status === 200) {
    const userData = {
      token: response.data.data.accessToken,
      ...response.data.data.user,
    };
    console.log(userData);
    dispatch(saveUserInfo(userData));
    await storeUserLoginData(userData);
    NavigationService.navigate('MainApp');
  } else {
    alert(response.data.message);
    //NavigationService.navigate('Login');
  }
  return response;
};

export const handleLogin = (data) => async (dispatch) => {
  const response = await AuthRequest.login(data);

  if (response.status === 201) {
    const userData = {
      token: response.data.accessToken,
      ...response.data.user,
    };
    console.log(userData);
    dispatch(saveUserInfo(userData));
    await storeUserLoginData(userData);
    // NavigationService.reset('Dashboard');
  }
  return response;
};
export const googleLogin = (data) => async (dispatch) => {
  const response = await AuthRequest.googleLogin(data);

  if (response.status === 200) {
    const userData = {
      token: response.data.data.accessToken,
      ...response.data.data.user,
    };
    console.log(userData);
    dispatch(saveUserInfo(userData));
    await storeUserLoginData(userData);
    // NavigationService.reset('Dashboard');
  }
  return response;
};
export const resetStore = () => (dispatch) => {
  dispatch(clearUserInfo());
};

export const logout = () => async (dispatch) => {
  dispatch(resetStore()); //clear data in redux
  removeUserData();
  NavigationService.navigate('Auth');
  //await AuthRequest.logout();
};
