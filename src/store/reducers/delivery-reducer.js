import * as actionTypes from '../../types/delivery-types';

const initialState = {
  deliverydata: null,
  delievery_loading: false,
  deliveryschedule: '',
  deliveryinfo: null,
  deliveryimage: '',
  deliveryhistory: null,
  wallethistory: null,
  upload_img_count: 0,
  trackdelivery: null,
  imageloading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_START:
      return {
        ...state,
        delievery_loading: true,
      };
    case actionTypes.LOAD_END:
      return {
        ...state,
        delievery_loading: false,
      };
    case actionTypes.IMAGE_LOAD_START:
      return {
        ...state,
        imageloading: true,
      };
    case actionTypes.IMAGE_LOAD_END:
      return {
        ...state,
        imageloading: false,
      };
    case actionTypes.SAVE_DELIVERY_DATA:
      return {
        ...state,
        deliverydata: action.data,
      };
    case actionTypes.SAVE_DELIVERY_HISTORY:
      return {
        ...state,
        deliveryhistory: action.data,
      };
    case actionTypes.SAVE_WALLET_HISTORY:
      return {
        ...state,
        wallethistory: action.data,
      };
    case actionTypes.TRACK_DELIVERY_HISTORY:
      return {
        ...state,
        trackdelivery: action.data,
      };
    case actionTypes.SAVE_DELIVERY_SCHEDULE:
      return {
        ...state,
        deliveryschedule: action.data,
      };
    case actionTypes.CLEAR_DELIVERY_DATA:
      return initialState;
    case actionTypes.SAVE_UPLOADED_IMAGE:
      return {
        ...state,
        deliveryimage: action.data,
      };
    case actionTypes.SAVE_UPLOADED_IMAGE_COUNT:
      return {
        ...state,
        upload_img_count: action.data,
      };
    case actionTypes.RESET_UPLOADED_IMAGE_COUNT:
      return {
        ...state,
        upload_img_count: 0,
      };
    case actionTypes.SAVE_DELIVERY_LOCATION_INFO:
      return {
        ...state,
        deliveryinfo: action.data,
      };
    default:
      return state;
  }
};
