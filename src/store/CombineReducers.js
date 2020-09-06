import {combineReducers} from 'redux';
import auth from './reducers/auth-reducer';
import delivery from './reducers/delivery-reducer';

export default combineReducers({
  auth,
  delivery,
});
