/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
const Login = ({navigation, route}) => {
  const email = route.params && route.params.email;

  return (
    <ImageBackground
      source={Images.login_bg}
      resizeMode="stretch"
      style={[Basestyle.container_with_space, styles.container]}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <Image
        source={Images.arc}
        resizeMode="center"
        resizeMethod="resize"
        style={styles.arc}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        style={{marginTop: hp(19), overflow: 'hidden'}}>
        <Image
          source={Images.flat_logo}
          resizeMode="contain"
          style={styles.logo_icon}
        />
        <View style={{marginTop: hp(7)}}>
          <FloatingTextInput
            label="Email Address"
            placeholder={email || 'test@gmail.com'}
            keyboardType="email-address"
            //value={email || ''}
            cutomwrapperInputStyle={{marginBottom: 30}}
          />
          <FloatingTextInput
            label="Password"
            placeholder="* * * * "
            secureTextEntry
            keyboardType="number-pad"
            rightElement={
              <TouchableOpacity style={{right: '80%'}}>
                <Entypo name="eye" size={25} color={colors.PRIMARY_GREY_02} />
              </TouchableOpacity>
            }
            cutomwrapperInputStyle={{marginBottom: 20}}
          />
          <Text
            onPress={() => navigation.navigate('ResetPassword')}
            style={styles.forgot_pass}>
            Forgot Password?
          </Text>
          <ButtonMain
            onPress={() => navigation.navigate('MainApp')}
            text="Login"
            btnContainerStyle={{marginTop: 60}}
          />
          <ButtonMain
            btnwhite
            onPress={() => navigation.navigate('SignUpLanding')}
            text="Sign Up"
            // showicon={
            //   <Image
            //     source={Images.stopwatch}
            //     resizeMode="contain"
            //     style={{width: 25, height: 25, marginRight: 10}}
            //   />
            // }
            btnTextStyles={{color: colors.PRIMARY_BLUE}}
            btnContainerStyle={{marginTop: 30}}
          />
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Login;
