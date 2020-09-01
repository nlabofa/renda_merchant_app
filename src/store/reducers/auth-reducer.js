import * as actionTypes from '../../types/auth-types';

const initialState = {
  user_roles: [],
  business_types: [],
  auth_loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_START:
      return {
        ...state,
        auth_loading: true,
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
    case actionTypes.SAVE_BUSINESS_TYPES:
      return {
        ...state,
        business_types: action.data,
      };
    default:
      return state;
  }
};
