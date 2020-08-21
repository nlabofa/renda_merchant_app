import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as HomeScreens from './src/navigation/Home/index';
import * as Expresscreens from './src/navigation/Express/index';
import * as AuthScreens from './src/navigation/Auth/index';
import * as OnboardScreens from './src/navigation/Onboard/index';

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
const ExpresStack = createStackNavigator();
const ExpresStackScreen = () => (
  <ExpresStack.Navigator headerMode="none" initialRouteName="">
    <ExpresStack.Screen name="ExpStep1" component={Expresscreens.ExpStep1} />
    <ExpresStack.Screen name="ExpStep2" component={Expresscreens.ExpStep2} />
    <ExpresStack.Screen name="ExpStep3" component={Expresscreens.ExpStep3} />
    <ExpresStack.Screen name="ExpStep4" component={Expresscreens.ExpStep4} />
  </ExpresStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none" initialRouteName="">
    <HomeStack.Screen
      name="Dashboard"
      component={HomeScreens.Dashboard}
      //options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="ListAll"
      component={HomeScreens.ListAll}
      //options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="ViewNotification"
      component={HomeScreens.ViewNotification}
      //options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="NotificationDetail"
      component={HomeScreens.NotificationDetail}
      //options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="DispatchDetail"
      component={HomeScreens.DispatchDetail}
      //options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="SignatureCapture"
      component={HomeScreens.SignatureCapture}
      //options={{headerShown: false}}
    />
    <HomeStack.Screen
      name="SubmitComplaint"
      component={HomeScreens.SubmitComplaint}
      //options={{headerShown: false}}
    />
  </HomeStack.Navigator>
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
      name="Home"
      component={HomeStackScreen}
      options={{
        animationEnabled: false,
        headerMode: 'none',
      }}
    />
    <RootStack.Screen
      name="Express"
      component={ExpresStackScreen}
      options={{
        animationEnabled: false,
        headerMode: 'none',
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
