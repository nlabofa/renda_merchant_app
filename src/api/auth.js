import RendaRequest from './rendaRequest';

export default class Auth extends RendaRequest {
  constructor() {
    super();
  }

  login = async (userData) => {
    try {
      const {data} = await this.noTokenRequestInstance.post(
        '/account/prospa_login/',
        userData,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  logout = async () => {
    try {
      const {data} = await this.requestInstance.post('/account/prospa_logout/');
      return data;
    } catch (err) {
      console.log(err);
      // return this.handleError(err);
    }
  };

  resetPassword = async (payload) => {
    try {
      const {data} = await this.noTokenRequestInstance.post(
        '/account/reset_password/',
        payload,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  getRoles = async () => {
    try {
      const {data} = await this.noTokenRequestInstance.get('/roles/');
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
