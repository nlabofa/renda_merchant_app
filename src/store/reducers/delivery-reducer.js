import * as actionTypes from '../../types/delivery-types';

const initialState = {
  deliverydata: null,
  delievery_loading: false,
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
    case actionTypes.SAVE_DELIVERY_DATA:
      return {
        ...state,
        deliverydata: action.data,
      };
    default:
      return state;
  }
};
