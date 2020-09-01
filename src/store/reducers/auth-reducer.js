import * as actionTypes from '../../types/auth-types';

const initialState = {
  user_roles: null,
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
    default:
      return state;
  }
};
