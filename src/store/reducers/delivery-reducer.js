import * as actionTypes from '../../types/delivery-types';

const initialState = {
  deliverydata: null,
  delievery_loading: true,
  deliveryinfo: null,
  deliveryimage: '',
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
    case actionTypes.SAVE_UPLOADED_IMAGE:
      return {
        ...state,
        deliveryimage: action.data,
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
