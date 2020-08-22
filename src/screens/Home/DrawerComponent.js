/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SafeAreaView from 'react-native-safe-area-view';

import styles from './styles/dashboard_styles';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import {processFontSize} from '../../helpers/fonts';

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
    screen: 'ViewNotification',
  },
  {
    title: 'Notifications',
    imgsrc: require('../../assets/images/bell_icon.png'),
    screen: 'ViewNotification',
  },
  {
    title: 'Profile',
    imgsrc: require('../../assets/images/profile_plain.png'),
    screen: 'ViewNotification',
    //customstyle: {width: 50},
  },
  {
    title: 'Support',
    imgsrc: require('../../assets/images/support.png'),
    screen: 'ViewNotification',
  },
];
const DrawerComponent = ({navigation}) => {
  const [activescreen, setActiveScreen] = useState('Home');

  const gotoScreen = (screen, title) => {
    setActiveScreen(title);
    navigation.closeDrawer();
    navigation.navigate(screen, {title: 'dgdgd'});
  };
  return (
    <SafeAreaView forceInset={{bottom: 'never'}} style={Basestyle.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
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
              <Image
                resizeMode="contain"
                style={styles.profile_pic_icon}
                source={Images.profileicon}
              />
            </View>
            <View style={styles.sidebar_topright}>
              <Text numberOfLines={1} style={[styles.opaq5]}>
                Eric Garner
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.opaq6,
                  {fontSize: 14, color: colors.PRIMARY_BLUE},
                ]}>
                ericgarner@gmail
              </Text>
            </View>
          </View>

          <View style={{marginTop: 25}}>
            {ITEM_LIST.map(({title, screen, customstyle = {}, imgsrc}) => (
              <TouchableOpacity
                onPress={() => gotoScreen(screen, title)}
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
          style={{width: processFontSize(120), height: processFontSize(140)}}
          source={require('../../assets/images/sliderbottomarc.png')}
        />
        <TouchableOpacity style={styles.sidebar_bottomright}>
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

export default DrawerComponent;
