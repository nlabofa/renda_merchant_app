/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import OneSignal from 'react-native-onesignal';
import CONFIG from './src/config';

OneSignal.setLogLevel(6, 0);

// Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
OneSignal.init(CONFIG.ONE_SIGNAL_APP_ID, {
  kOSSettingsKeyAutoPrompt: false,
  kOSSettingsKeyInAppLaunchURL: false,
  kOSSettingsKeyInFocusDisplayOption: 2,
});
OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

AppRegistry.registerComponent(appName, () => App);
