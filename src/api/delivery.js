import RendaRequest from './rendaRequest';
import axios from 'axios';
import CONFIG from '../config';
import store from '../store/index';
import {saveUploadeImgCount} from '../actions/delivery.action';
export default class Auth extends RendaRequest {
  constructor() {
    super();
  }

  uploadImageToBE = async (imagedata) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this._token}`,
      },
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        console.log(percentCompleted);
        store.dispatch(saveUploadeImgCount(percentCompleted));
      },
    };
    const formData = new FormData();

    formData.append('files', {
      uri: imagedata.uri,
      type: imagedata.type,
      name: imagedata.fileName || 'testName',
      data: imagedata.data,
    });
    try {
      const {data} = await axios.post(
        CONFIG.BASE_URL + 'fileUploader',
        formData,
        config,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
  submitDeliveryRequest = async (payload) => {
    try {
      const response = await this.requestInstance.post('/requests', payload);
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  getUssdCode = async (payload) => {
    try {
      const response = await this.requestInstance.post(
        '/payment/ussd',
        payload,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  fetchDeliveryHistory = async (id) => {
    try {
      const {data} = await this.requestInstance.get(
        `/requests?user=${id}&$populate=status user dispatch&$sort[createdAt]=-1`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
  fetchWalletTransactions = async (id) => {
    try {
      const {data} = await this.requestInstance.get(
        `/transactions?user=${this.userId}&$sort[createdAt]=-1`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
  trackDeliveryHistory = async (id) => {
    try {
      const {data} = await this.requestInstance.get(
        `/orders?user=${id}&$populate=status user dispatch&$sort[createdAt]=-1`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
  checkPrice = async (payload) => {
    try {
      const response = await this.requestInstance.post(
        '/pricing/check',
        payload,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
