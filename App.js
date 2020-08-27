import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as HomeScreens from './src/navigation/Home/index';
import * as Delivery from './src/navigation/Delivery/index';
import * as Expresscreens from './src/navigation/Express/index';
import * as AuthScreens from './src/navigation/Auth/index';
import * as OnboardScreens from './src/navigation/Onboard/index';

const Drawer = createDrawerNavigator();
const DrawerStackScreen = () => (
  <Drawer.Navigator
    drawerContent={(props) => <HomeScreens.DrawerComponent {...props} />}
    initialRouteName="">
    <Drawer.Screen name="Home" component={HomeScreens.Landing} />
    <Drawer.Screen name="Dashboard" component={HomeScreens.Dashboard} />
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
    <DeepStack.Screen name="SetLocation" component={Delivery.SetLocation} />
    <DeepStack.Screen
      name="SetLocationFull"
      component={Delivery.SetLocationFull}
    />

    {/**Express delivery stack */}

    <DeepStack.Screen name="ExpStep1" component={Expresscreens.ExpStep1} />
    <DeepStack.Screen name="ExpStep2" component={Expresscreens.ExpStep2} />
    <DeepStack.Screen name="ExpStep3" component={Expresscreens.ExpStep3} />
    <DeepStack.Screen name="ExpStep4" component={Expresscreens.ExpStep4} />
  </DeepStack.Navigator>
);
const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none" initialRouteName="">
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
const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;
