import * as actionTypes from '../types/delivery-types';
import {AuthRequest} from '../api/index';
import {
  storeUserLoginData,
  removeUserData,
  retrieveUserData,
} from '../helpers/auth';
//import {getBusinessAccounts, resetStore} from './account';
import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';
import NavigationService from '../helpers/NavigationService';
//import store from '../store/index';
//import { alertModal } from '../actions/alert';

const loadStart = () => {
  return {
    type: actionTypes.LOAD_START,
  };
};

const loadEnd = () => {
  return {
    type: actionTypes.LOAD_END,
  };
};
export const saveDeliveryData = (data) => {
  return {
    type: actionTypes.SAVE_DELIVERY_DATA,
    data,
  };
};
