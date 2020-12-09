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
import LinearGradient from 'react-native-linear-gradient';
import {processFontSize} from '../../helpers/fonts';
import ItemBox from '../../components/ItemBox';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth.action';
import {fetchWalletTransactions} from '../../actions/delivery.action';
import {formatMoney} from '../../helpers/libs';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const WalletLanding = ({
  navigation,
  wallethistory,
  fetchWalletTransactions,
  user_info,
}) => {
  const wallet_balance = user_info?.wallet?.balance;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      await fetchWalletTransactions();
      setIsLoading(false);
      //console.log(response);
    };
    fetchHistory();
  }, []);
  const _renderItem = ({item, index}) => (
    <ItemBox
      subtitle={
        moment(item.createdAt).format('Do, MMM YYYY') +
        ' | ' +
        moment(item.createdAt).format('h:mm a')
      }
      cusomsubtitlestyle={{width: '100%'}}
      customicon={
        <Image
          source={
            item.action === 'Top Ups' ? Images.credit_image : Images.debit_image
          }
          resizeMode="contain"
          style={{width: 55, height: 55}}
        />
      }
      customtext={formatMoney(item.amount)}
      customtextstyle={{fontSize: 20}}
      // onPress={() => {
      //   saveDeliverySchedule('sameday');
      //   navigation.navigate('SelectDeliveryType', {type: 'sameday'});
      // }}
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
        You have made no wallet transactions yet{'\n'}
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
        navigation={navigation}
        containerstyle={{height: heightPercentageToDP(27)}}
        lefticon={
          <Feather
            name="menu"
            color="#fff"
            size={processFontSize(32)}
            style={{marginRight: 15}}
            onPress={() => navigation.toggleDrawer()}
          />
        }
        title="Wallet">
        <View style={{marginTop: 30}}>
          <View style={styles.dashlist}>
            <View style={{width: '55%'}}>
              <Text style={[styles.opaq1]}>Wallet Balance</Text>
              <Text numberOfLines={1} style={Basestyle.bold_35}>
                {formatMoney(wallet_balance) || 0}
              </Text>
            </View>
          </View>
        </View>
      </GradientHeader>
      <LinearGradient
        colors={['#F99B20', '#F99B20']}
        style={styles.button_active2}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectTopUpType')}
          style={{width: '100%', height: '100%', justifyContent: 'center'}}>
          <Text style={[Basestyle.bold_14, {textAlign: 'center'}]}>Top Up</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.scrollview}>
        <View style={{marginTop: 25}}>
          {/* <View style={Basestyle.row_space_between}>
            <Text style={[styles.opaq2]}>Recent Deliveries</Text>
          </View> */}
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
                  data={wallethistory}
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
    delivery: {wallethistory, trackdelivery},
  } = state;
  return {
    user_info,
    wallethistory,
    trackdelivery,
  };
};

const mapDispatchToProps = {
  logout,
  fetchWalletTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletLanding);
