import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as HomeScreens from './src/navigation/Home/index';
import * as Delivery from './src/navigation/Delivery/index';
import * as Expresscreens from './src/navigation/Express/index';
import * as AuthScreens from './src/navigation/Auth/index';
import * as PaymentScreens from './src/navigation/Payments/index';
import * as OnboardScreens from './src/navigation/Onboard/index';
import LoadingScreen from './src/screens/LoadingScreen';
import Store from './src/store/index';
import {Provider} from 'react-redux';
import {navigationRef} from './src/helpers/NavigationService';
import SplashScreen from 'react-native-splash-screen';

import OneSignal from 'react-native-onesignal';
import {saveDeviceId} from './src/actions/auth.action';

const onIds = (device) => {
  console.log('Device info: ', device);
  Store.dispatch(saveDeviceId(device.userId));
};
const onReceived = (notification) => {
  console.log('Notification received: ', notification);
};

const onOpened = (openResult) => {
  console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
};

const Drawer = createDrawerNavigator();
const DrawerStackScreen = () => (
  <Drawer.Navigator
    drawerContent={(props) => <HomeScreens.DrawerComponent {...props} />}
    initialRouteName="">
    <Drawer.Screen name="Home" component={HomeScreens.Landing} />
    <Drawer.Screen name="Dashboard" component={HomeScreens.Dashboard} />
    <Drawer.Screen name="WalletLanding" component={Delivery.WalletLanding} />
  </Drawer.Navigator>
);
const OnboardStack = createStackNavigator();
const OnboardStackScreen = () => (
  <OnboardStack.Navigator headerMode="none" initialRouteName="">
    <OnboardStack.Screen
      name="Onboarding"
      component={OnboardScreens.Onboarding}
    />
  </OnboardStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName="">
    <AuthStack.Screen name="Login" component={AuthScreens.Login} />
    <AuthStack.Screen
      name="ResetPassword"
      component={AuthScreens.ResetPassword}
    />
    <AuthStack.Screen
      name="SignUpLanding"
      component={AuthScreens.SignUpLanding}
    />
    <AuthStack.Screen
      name="SignUpIndividual"
      component={AuthScreens.SignUpIndividual}
    />
    <AuthStack.Screen
      name="SignUpBusiness"
      component={AuthScreens.SignUpBusiness}
    />
    <AuthStack.Screen name="UpdatePhone" component={AuthScreens.UpdatePhone} />
    <AuthStack.Screen name="SignUpOTP" component={AuthScreens.SignUpOTP} />
  </AuthStack.Navigator>
);

const DeepStack = createStackNavigator();
const DeepStackScreen = () => (
  <DeepStack.Navigator headerMode="none" initialRouteName="">
    <DeepStack.Screen
      name="HomeDrawer"
      component={DrawerStackScreen}
      options={{
        animationEnabled: false,
        headerMode: 'none',
      }}
    />
    {/**Dashboard Stack screens */}
    <DeepStack.Screen name="Dashboard" component={HomeScreens.Dashboard} />
    <DeepStack.Screen name="ListAll" component={HomeScreens.ListAll} />
    <DeepStack.Screen
      name="ViewNotification"
      component={HomeScreens.ViewNotification}
    />
    <DeepStack.Screen
      name="ViewRateRider"
      component={HomeScreens.ViewRateRider}
    />
    <DeepStack.Screen
      name="NotificationDetail"
      component={HomeScreens.NotificationDetail}
    />
    <DeepStack.Screen
      name="DispatchDetail"
      component={HomeScreens.DispatchDetail}
    />
    <DeepStack.Screen
      name="SignatureCapture"
      component={HomeScreens.SignatureCapture}
    />
    <DeepStack.Screen
      name="SubmitComplaint"
      component={HomeScreens.SubmitComplaint}
    />
    {/**Delivery Stack screens */}
    <DeepStack.Screen name="DeliveryLanding" component={Delivery.Landing} />
    <DeepStack.Screen name="TrackDelivery" component={Delivery.TrackDelivery} />
    <DeepStack.Screen
      name="DispatchDetailHistory"
      component={Delivery.DispatchDetailHistory}
    />
    <DeepStack.Screen
      name="DeliveryHistory"
      component={Delivery.DeliveryHistory}
    />
    <DeepStack.Screen name="NewDelivery" component={Delivery.NewDelivery} />
    <DeepStack.Screen
      name="SelectDeliveryType"
      component={Delivery.SelectDeliveryType}
    />
    <DeepStack.Screen
      name="SelectTopUpType"
      component={Delivery.SelectTopUpType}
    />
    <DeepStack.Screen name="SetLocation" component={Delivery.SetLocation} />
    <DeepStack.Screen
      name="SetLocationFull"
      component={Delivery.SetLocationFull}
    />
    <DeepStack.Screen name="SenderInfo" component={Delivery.SenderInfo} />
    <DeepStack.Screen name="ReceiverInfo" component={Delivery.ReceiverInfo} />
    <DeepStack.Screen
      name="PackageDetails"
      component={Delivery.PackageDetails}
    />
    <DeepStack.Screen
      name="PackageDetailsFull"
      component={Delivery.PackageDetailsFull}
    />

    {/**Payment Stack screens */}
    <DeepStack.Screen
      name="SelectPaymentType"
      component={PaymentScreens.SelectPaymentType}
    />
    <DeepStack.Screen
      name="ProcessUSSD"
      component={PaymentScreens.ProcessUSSD}
    />
    <DeepStack.Screen name="PayCard" component={PaymentScreens.PayCard} />
    <DeepStack.Screen name="PayUssd" component={PaymentScreens.PayUssd} />
    <DeepStack.Screen
      name="PayMerchant"
      component={PaymentScreens.PayMerchant}
    />

    {/**Express delivery stack */}

    <DeepStack.Screen name="ExpStep1" component={Expresscreens.ExpStep1} />
    <DeepStack.Screen name="ExpStep2" component={Expresscreens.ExpStep2} />
    <DeepStack.Screen name="ExpStep3" component={Expresscreens.ExpStep3} />
    <DeepStack.Screen name="ExpStep4" component={Expresscreens.ExpStep4} />
  </DeepStack.Navigator>
);
const RootStack = createStackNavigator();
const RootStackScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
    OneSignal.addEventListener('ids', onIds);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('received', onReceived);
    return () => {
      OneSignal.removeEventListener('ids', onIds);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('received', onReceived);
    };
  }, []);
  return (
    <RootStack.Navigator headerMode="none" initialRouteName="">
      <RootStack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{
          animationEnabled: false,
          headerMode: 'none',
        }}
      />
      <RootStack.Screen
        name="Onboard"
        component={OnboardStackScreen}
        options={{
          animationEnabled: false,
          headerMode: 'none',
        }}
      />
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
          headerMode: 'none',
        }}
      />
      <RootStack.Screen
        name="MainApp"
        component={DeepStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    </RootStack.Navigator>
  );
};
const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
