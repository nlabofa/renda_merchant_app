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
}