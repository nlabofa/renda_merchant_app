import * as actionTypes from '../types/delivery-types';
import {DeliveryRequest} from '../api/index';
//import {getBusinessAccounts, resetStore} from './account';
import NavigationService from '../helpers/NavigationService';
import store from '../store/index';
//import { alertModal } from '../actions/alert';

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
export const saveUploadeImgCount = (data) => {
  return {
    type: actionTypes.SAVE_UPLOADED_IMAGE_COUNT,
    data,
  };
};
export const resetUploadeImgCount = () => {
  return {
    type: actionTypes.RESET_UPLOADED_IMAGE_COUNT,
  };
};
export const saveLocationInfo = (data) => {
  return {
    type: actionTypes.SAVE_DELIVERY_LOCATION_INFO,
    data,
  };
};
export const saveDeliveryHistory = (data) => {
  return {
    type: actionTypes.SAVE_DELIVERY_HISTORY,
    data,
  };
};
export const saveWalletTransactions = (data) => {
  return {
    type: actionTypes.SAVE_WALLET_HISTORY,
    data,
  };
};
export const saveIncomingDelivery = (data) => {
  return {
    type: actionTypes.SET_INCOMING_DELIVERY,
    data,
  };
};
export const clearIncomingDelivery = () => {
  return {
    type: actionTypes.CLEAR_INCOMING_DELIVERY,
  };
};
export const trackDeliveryHistory = (data) => {
  return {
    type: actionTypes.TRACK_DELIVERY_HISTORY,
    data,
  };
};
export const uploadImage = (data) => async (dispatch) => {
  console.log('uploading');
  dispatch(resetUploadeImgCount());
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
export const getUssdCode = (data) => async (dispatch) => {
  const response = await DeliveryRequest.getUssdCode(data);
  console.log(response);
  return response;
};
export const fetchDeliveryHistory = () => async (dispatch) => {
  const {_id} = store.getState().auth.user_info;
  const response = await DeliveryRequest.fetchDeliveryHistory(_id);
  dispatch(saveDeliveryHistory(response.data));
  console.log(response);
  return response;
};
export const fetchWalletTransactions = () => async (dispatch) => {
  const response = await DeliveryRequest.fetchWalletTransactions();
  dispatch(saveWalletTransactions(response.data));
  console.log(response);
  return response;
};
export const fetchTrackDelivery = () => async (dispatch) => {
  const {_id} = store.getState().auth.user_info;
  const response = await DeliveryRequest.trackDeliveryHistory(_id);
  dispatch(trackDeliveryHistory(response.data));
  console.log(response);
  return response;
};

export const checkPrice = (data) => async (dispatch) => {
  const {deliverydata} = store.getState().delivery;

  console.log(data);
  const response = await DeliveryRequest.checkPrice(data);
  console.log(response);
  if (response.data.status === 200) {
    dispatch(
      saveDeliveryData({
        ...deliverydata,
        paymentAmount: response.data.estimate[0].price,
      }),
    );
  }
  return response;
};
