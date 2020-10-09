import * as actionTypes from '../../types/auth-types';

const initialState = {
  user_roles: [],
  user_info: null,
  business_types: [],
  device_id: null,
  categories: null,
  auth_loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_START:
      return {
        ...state,
        auth_loading: true,
      };
    case actionTypes.SAVE_DEVICE_ID:
      return {
        ...state,
        device_id: action.data,
      };
    case actionTypes.LOAD_END:
      return {
        ...state,
        auth_loading: false,
      };
    case actionTypes.SAVE_USER_ROLES:
      return {
        ...state,
        user_roles: action.data,
      };
    case actionTypes.SAVE_CATEGORIES:
      return {
        ...state,
        categories: action.data,
      };
    case actionTypes.SAVE_USER_INFO:
      return {
        ...state,
        user_info: action.data,
      };
    case actionTypes.RESET_USER_INFO:
      return {
        ...state,
        user_info: null,
      };
    case actionTypes.SAVE_BUSINESS_TYPES:
      return {
        ...state,
        business_types: action.data,
      };
    default:
      return state;
  }
};
