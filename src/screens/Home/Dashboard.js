/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles/dashboard_styles';
import {Basestyle, colors} from '../../helpers/BaseThemes';
import GradientHeader from '../../components/GradientHeader';
import {processFontSize} from '../../helpers/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import ItemBox from '../../components/ItemBox';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth.action';

const Dashboard = ({navigation, user_info}) => {
  const {firstName} = user_info;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={Basestyle.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <GradientHeader
        gradient_colors={['#1B5480', '#3990BB']}
        containerstyle={styles.extraheight}
        showrighticon
        navigation={navigation}
        lefticon={
          <Feather
            name="menu"
            color="#fff"
            size={processFontSize(32)}
            style={{marginRight: 15}}
            onPress={() => navigation.toggleDrawer()}
          />
        }
        title="DASHBOARD">
        <View style={{marginTop: 40}}>
          <Text
            style={[Basestyle.bold_17, {fontSize: 20, textAlign: 'center'}]}>
            Welcome {firstName}
          </Text>
          <View style={styles.dashlist}>
            <View style={{width: '55%'}}>
              <Text style={[styles.opaq1]}>Wallet Balance</Text>
              <Text numberOfLines={1} style={Basestyle.bold_35}>
                N 23,000
              </Text>
            </View>
            <LinearGradient
              colors={['#1B5480', '#1b557d']}
              style={styles.button_active}>
              <TouchableOpacity
                // onPress={() => setActive_tab('deliveries')}
                style={styles.button_row}>
                <Text style={Basestyle.bold_14}>Manage Wallet</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={35}
                  color={colors.PRIMARY_ORANGE}
                  style={{right: 0, position: 'absolute', alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.dashlist}>
            <View style={{width: '55%'}}>
              <Text style={[styles.opaq1]}>Total Deliveries</Text>
              <Text numberOfLines={1} style={Basestyle.bold_35}>
                1500
              </Text>
            </View>
            <LinearGradient
              colors={['#1B5480', '#1b557d']}
              style={styles.button_active}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DeliveryLanding')}
                style={styles.button_row}>
                <Text style={Basestyle.bold_14}>View Deliveries</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={35}
                  color={colors.PRIMARY_ORANGE}
                  style={{right: 0, position: 'absolute', alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.dashlist}>
            <View style={{width: '55%'}}>
              <Text style={[styles.opaq1]}>Inventory</Text>
              <Text numberOfLines={1} style={Basestyle.bold_35}>
                5431
              </Text>
            </View>
            <LinearGradient
              colors={['#1B5480', '#1b557d']}
              style={styles.button_active}>
              <TouchableOpacity
                // onPress={() => setActive_tab('deliveries')}
                style={[styles.button_row, {paddingLeft: 12}]}>
                <Text style={Basestyle.bold_14}>Manage Inventory</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={35}
                  color={colors.PRIMARY_ORANGE}
                  style={{right: 0, position: 'absolute', alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </GradientHeader>
      <View style={styles.scrollview}>
        <View style={{marginTop: 25}}>
          <View style={Basestyle.row_space_between}>
            <Text style={[styles.opaq2]}>Recent Deliveries</Text>
          </View>
          <View style={{marginTop: 15}}>
            <ItemBox
              idnumber="RA0492859"
              status="completed"
              destination="Ikeja"
              duedate="22, July 2020"
              onPress={() =>
                navigation.navigate('DispatchDetailHistory', {completed: false})
              }
            />
            <ItemBox
              idnumber="RA0492859"
              status="failed"
              destination="Ikeja"
              duedate="22, July 2020"
              onPress={() =>
                navigation.navigate('DispatchDetailHistory', {completed: false})
              }
            />
            <ItemBox
              idnumber="RA0492859"
              status="in progress"
              destination="Ikeja"
              duedate="22, July 2020"
              onPress={() =>
                navigation.navigate('DispatchDetailHistory', {completed: false})
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
