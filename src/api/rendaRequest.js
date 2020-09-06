const axios = require('axios').default;
import AsyncStorage from '@react-native-community/async-storage';

import CONFIG from '../config';
import HttpError from '../helpers/Errors/http-error';
//import NavigationService from '../helpers/NavigationService';

const baseURL = CONFIG.BASE_URL;

export default class RendaRequest {
  _token = '';
  requestInstance;
  noTokenRequestInstance;
  userId;

  constructor() {
    this.init();
  }

  async init() {
    const storedUserData = await AsyncStorage.getItem('user_stats');
    const userData = JSON.parse(storedUserData) || {};
    // console.log(userData);

    await this._setToken(userData.token);
    this._setRequestInstance();
    this._setUserId(userData._id);
  }

  async _setToken(token) {
    this._token = token;
  }

  _setUserId(id) {
    this.userId = id;
  }

  _setRequestInstance() {
    this.requestInstance = axios.create({
      baseURL,
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    });
    this.noTokenRequestInstance = axios.create({
      baseURL,
    });
  }

  handleError(err) {
    let message;
    let status;
    let field_name;
    if (err.response) {
      // error from API
      console.log('LIFE HAPPENS', err.response);
      //   if (err.response.status === 401) {
      //     // redirect to login screen
      //     NavigationService.reset('Login', {
      //       errorMessage: 'Please login to continue',
      //     });
      //   }

      message = err.response.data.message;
      status = err.response.status;
      field_name = err.response.data.field_name || '';
    }

    if (err.request && !err.response) {
      // a network error
      message = err.request._response;
      console.log('Network Error', err.request, message);
      if (message.indexOf('internet') === -1) {
        message = 'Something went wrong. Please try again';
      }
    }

    message = message || 'Oops! Something went wrong. Please try again';

    // store.dispatch(alertModal({ message }));
    const error = new HttpError(message);
    error.status = status;
    error.field_name = field_name;

    return Promise.reject(error);
  }
}
