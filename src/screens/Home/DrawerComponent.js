/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Text,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaView from 'react-native-safe-area-view';

import styles from './styles/dashboard_styles';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import {processFontSize} from '../../helpers/fonts';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth.action';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const ITEM_LIST = [
  {
    title: 'Home',
    imgsrc: require('../../assets/images/home_icon.png'),
    screen: 'Home',
  },
  {
    title: 'Dashboard',
    imgsrc: require('../../assets/images/dashboard_icon.png'),
    screen: 'Dashboard',
  },
  {
    title: 'Wallet',
    imgsrc: require('../../assets/images/wallet_icon.png'),
    screen: 'WalletLanding',
  },
  // {
  //   title: 'Notifications',
  //   imgsrc: require('../../assets/images/bell_icon.png'),
  //   screen: 'ViewNotification',
  // },
  {
    title: 'Profile',
    imgsrc: require('../../assets/images/profile_plain.png'),
    screen: 'EditProfile',
    //customstyle: {width: 50},
  },
  // {
  //   title: 'Support',
  //   imgsrc: require('../../assets/images/support.png'),
  //   screen: '',
  // },
];
const DrawerComponent = ({navigation, logout, user_info}) => {
  const [activescreen, setActiveScreen] = useState('Home');

  const gotoScreen = (screen, title) => {
    setActiveScreen(title);
    navigation.closeDrawer();
    navigation.navigate(screen, {title: 'dgdgd'});
  };
  const performLogout = () => {
    Alert.alert('Are you sure you want to logout?', '', [
      {text: 'Yes', onPress: () => logout()},
      {text: 'Cancel', onPress: () => {}},
    ]);
  };
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={Basestyle.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <ScrollView
        style={[isIphoneX() ? null : {marginTop: 30}]}
        showsVerticalScrollIndicator={true}>
        <View style={{marginHorizontal: 15}}>
          <Ionicons
            name="close"
            size={35}
            color={colors.PRIMARY_BLUE}
            style={{alignSelf: 'flex-end'}}
            onPress={() => navigation.toggleDrawer()}
          />
          <View style={styles.sidebar_top}>
            <View style={[styles.profile_pic_view]}>
              {user_info && user_info.profileImage ? (
                <Image
                  resizeMode="contain"
                  style={styles.profile_pic_icon}
                  source={{uri: user_info.profileImage}}
                />
              ) : (
                <Image
                  resizeMode="contain"
                  style={styles.profile_pic_icon}
                  source={Images.profileicon}
                />
              )}
            </View>
            <View style={styles.sidebar_topright}>
              <Text numberOfLines={1} style={[styles.opaq5]}>
                {user_info && user_info.firstName + ' ' + user_info.lastName}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.opaq6,
                  {fontSize: 14, color: colors.PRIMARY_BLUE},
                ]}>
                {user_info && user_info.email}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 25}}>
            {ITEM_LIST.map(({title, screen, customstyle = {}, imgsrc}) => (
              <TouchableOpacity
                onPress={() => screen && gotoScreen(screen, title)}
                key={title}
                activeOpacity={0.7}
                style={[
                  styles.itemlist,
                  activescreen === title ? styles.activeitem : null,
                ]}>
                <Image
                  resizeMode="contain"
                  style={[styles.itemimage, customstyle]}
                  source={imgsrc}
                />
                <Text
                  numberOfLines={1}
                  style={[
                    styles.opaq5,
                    activescreen === title ? styles.activeitemtext : null,
                  ]}>
                  {title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.sidebar_bottom}>
        <ImageBackground
          resizeMode="cover"
          style={{
            width: processFontSize(170),
            height: heightPercentageToDP(45),
          }}
          source={require('../../assets/images/sliderbottomarc.png')}
        />
        <TouchableOpacity
          onPress={() => performLogout()}
          style={styles.sidebar_bottomright}>
          <Image
            source={require('../../assets/images/logout_icon.png')}
            resizeMode="contain"
            style={styles.logouticon}
          />
          <Text style={[styles.opaq5]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: {user_info},
  } = state;
  return {
    user_info,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerComponent);
