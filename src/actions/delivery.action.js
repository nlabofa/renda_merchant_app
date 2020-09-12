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
export const saveDeliverySchedule = (data) => {
  return {
    type: actionTypes.SAVE_DELIVERY_SCHEDULE,
    data,
  };
};
export const clearDeliveryData = () => {
  return {
    type: actionTypes.CLEAR_DELIVERY_DATA,
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
  const response = await DeliveryRequest.submitDeliveryRequest(data);
  console.log(response);
  return response;
};
