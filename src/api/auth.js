import RendaRequest from './rendaRequest';

export default class Auth extends RendaRequest {
  constructor() {
    super();
  }

  login = async (userData) => {
    try {
      const response = await this.noTokenRequestInstance.post(
        '/authentication',
        userData,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  googleLogin = async (userData) => {
    try {
      const response = await this.noTokenRequestInstance.post(
        '/google/sign-in',
        userData,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  googleSignUp = async (userData) => {
    try {
      const response = await this.noTokenRequestInstance.post(
        '/google/sign-up',
        userData,
      );
      return response;
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

  createAccount = async (payload) => {
    try {
      const response = await this.noTokenRequestInstance.post(
        '/users',
        payload,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  forgotPassword = async (payload) => {
    try {
      const response = await this.noTokenRequestInstance.post(
        '/user/forgot-password',
        payload,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  rateDispatch = async (payload) => {
    try {
      const response = await this.requestInstance.post(
        '/order/rating',
        payload,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  resetPassword = async (payload) => {
    try {
      const response = await this.noTokenRequestInstance.post(
        '/user/reset-password',
        payload,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  updateUserInfo = async (userData) => {
    try {
      const response = await this.requestInstance.patch(
        `/users/${this.userId}?$populate=wallet`,
        userData,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };
  verifyOTP = async (payload) => {
    try {
      const response = await this.noTokenRequestInstance.post(
        '/users/verify',
        payload,
      );
      return response;
    } catch (err) {
      return this.handleError(err);
    }
  };

  getRoles = async () => {
    try {
      const {data} = await this.noTokenRequestInstance.get('/roles');
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
  getCategories = async () => {
    try {
      const {data} = await this.requestInstance.get('/category');
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
  getBusinessTypes = async () => {
    try {
      const {data} = await this.noTokenRequestInstance.get('/businesstype');
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
