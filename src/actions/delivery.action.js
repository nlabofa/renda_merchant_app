import * as actionTypes from '../types/delivery-types';
import {DeliveryRequest} from '../api/index';
//import {getBusinessAccounts, resetStore} from './account';
import NavigationService from '../helpers/NavigationService';
//import store from '../store/index';
//import { alertModal } from '../actions/alert';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};
const loadStop = () => {
  return {
    type: actionTypes.LOAD_END,
  };
};
const imageUploadStart = () => {
  return {
    type: actionTypes.IMAGE_LOAD_START,
  };
};

const imageUploadStop = () => {
  return {
    type: actionTypes.IMAGE_LOAD_END,
  };
};
export const saveDeliveryData = (data) => {
  return {
    type: actionTypes.SAVE_DELIVERY_DATA,
    data,
  };
};
export const saveUploadedImage = (data) => {
  return {
    type: actionTypes.SAVE_UPLOADED_IMAGE,
    data,
  };
};
export const saveLocationInfo = (data) => {
  return {
    type: actionTypes.SAVE_DELIVERY_LOCATION_INFO,
    data,
  };
};
export const uploadImage = (data) => async (dispatch) => {
  console.log('uploading');
  dispatch(imageUploadStart());
  const response = await DeliveryRequest.uploadImageToBE(data);
  dispatch(saveUploadedImage(response.data[0]));
  dispatch(imageUploadStop());
  console.log(response);
  return response;
};
export const submitDeliveryRequest = (data) => async (dispatch) => {
  dispatch(loadStart());
  const response = await DeliveryRequest.submitDeliveryRequest(data);
  if (response.status === 201) {
    console.log('request successful');
    dispatch(loadStop());
    // const userData = {
    //   token: response.data.accessToken,
    //   ...response.data.user,
    // };
    //console.log(userData);
    //dispatch(saveUserInfo(userData));
    // NavigationService.reset('Dashboard');
  } else {
    dispatch(loadStop());
  }
  console.log(response);
  return response;
};
