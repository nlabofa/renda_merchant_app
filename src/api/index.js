import Auth from './auth';

export const AuthRequest = new Auth();

export const resetRequest = async () => {
  /**
   * @todo
   * make all functions here run simultaneously
   */
  await AuthRequest.init();
};
