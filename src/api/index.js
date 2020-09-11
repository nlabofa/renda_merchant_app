import Auth from './auth';
import Delivery from './delivery';
export const AuthRequest = new Auth();
export const DeliveryRequest = new Delivery();

export const resetRequest = async () => {
  /**
   * @todo
   * make all functions here run simultaneously
   */
  await AuthRequest.init();
  await DeliveryRequest.init();
};
