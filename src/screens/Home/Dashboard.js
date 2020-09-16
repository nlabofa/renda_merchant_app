/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles/dashboard_styles';
import {Basestyle, colors, Images} from '../../helpers/BaseThemes';
import GradientHeader from '../../components/GradientHeader';
import moment from 'moment';
import {processFontSize} from '../../helpers/fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import ItemBox from '../../components/ItemBox';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth.action';
import {fetchDeliveryHistory} from '../../actions/delivery.action';

const Dashboard = ({
  navigation,
  deliveryhistory,
  fetchDeliveryHistory,
  user_info,
}) => {
  const firstName = user_info && user_info.firstName;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      await fetchDeliveryHistory();
      setIsLoading(false);
      //console.log(response);
    };
    fetchHistory();
  }, []);
  const _renderItem = ({item, index}) => (
    <ItemBox
      idnumber={item._id}
      status={item.status.status}
      destination={item.dropOffLandmark}
      duedate={moment(item.deliveryDate).format('Do, MMM YYYY')}
      onPress={() =>
        navigation.navigate('DispatchDetailHistory', {
          completed: false,
          item,
        })
      }
    />
  );
  const EmptyView = () => (
    <View style={styles.empty_view}>
      <Image
        source={Images.empty_bag}
        style={{width: 109, height: 141}}
        resizeMode="contain"
      />
      <Text style={[styles.empty_text]}>
        You have made no delivery request yet{'\n'}
      </Text>
    </View>
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={[1]}
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
                N 0
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
                {(deliveryhistory && deliveryhistory.length) || 0}
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
                0
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
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={colors.PRIMARY_PURPLE}
                style={{marginTop: 30}}
              />
            ) : (
              <View>
                <FlatList
                  ListEmptyComponent={EmptyView()}
                  showsVerticalScrollIndicator={false}
                  data={deliveryhistory}
                  renderItem={_renderItem}
                  keyExtractor={(item, index) => `list-item-${index}`}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const {
    auth: {user_info},
    delivery: {deliveryhistory, trackdelivery},
  } = state;
  return {
    user_info,
    deliveryhistory,
    trackdelivery,
  };
};

const mapDispatchToProps = {
  logout,
  fetchDeliveryHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
