import RendaRequest from './rendaRequest';
import axios from 'axios';
import CONFIG from '../config';
export default class Auth extends RendaRequest {
  constructor() {
    super();
  }

  uploadImageToBE = async (imagedata) => {
    const formData = new FormData();

    formData.append('files', {
      uri: imagedata.uri,
      type: imagedata.type,
      name: imagedata.fileName || 'testName',
      data: imagedata.data,
    });
    try {
      const {data} = await axios({
        method: 'post',
        url: CONFIG.BASE_URL + 'fileUploader',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this._token}`,
        },
      });

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
  fetchDeliveryHistory = async (id) => {
    try {
      const {data} = await this.requestInstance.get(
        `/requests?user=${id}&$populate=status user dispatch&$sort=-1`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
  trackDeliveryHistory = async (id) => {
    try {
      const {data} = await this.requestInstance.get(
        `/orders?user=${id}&$populate=status user dispatch&$sort=-1`,
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
