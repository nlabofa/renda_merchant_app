/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles/dashboard_styles';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import ItemBox from '../../components/ItemBox';
const Dashboard = ({navigation}) => {
  const [activetab, setActive_tab] = useState('deliveries');
  const active_btn = ['#1B5480', '#3990BB'];
  const inactive_btn = ['transparent', 'transparent'];

  const EmptyView = () => (
    <View style={styles.empty_view}>
      <Image
        source={Images.empty_bag}
        style={{width: 109, height: 141}}
        resizeMode="contain"
      />
      <Text style={[styles.empty_text]}>
        You have made no deliveries yet{'\n'} Check your Notifications to get
        started
      </Text>
    </View>
  );
  return (
    <View style={Basestyle.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      {/* headerbox starts */}
      <LinearGradient
        colors={['#1B5480', '#3990BB', '#55C9F4']}
        style={styles.dashboard_container}
        locations={[0, 0.8, 1]}>
        <View style={styles.head_row}>
          <Text onPress={() => setActive_tab} style={styles.head_row_text}>
            Dispatch Dashboard
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ViewNotification')}
            style={styles.bell_icon}>
            <Ionicons color="#fff" name="ios-notifications-outline" size={27} />
            <Entypo
              name="dot-single"
              size={40}
              color={colors.PRIMARY_RED}
              style={styles.dot_single}
            />
          </TouchableOpacity>
        </View>
        {/* middle content */}
        <View style={styles.middle_content}>
          <View>
            <Text style={[styles.opaq1]}>Completed Deliveries</Text>
            <Text style={Basestyle.bold_40}>431</Text>
          </View>
          <View>
            <Text style={[styles.opaq1]}>Active Deliveries</Text>
            <Text style={Basestyle.bold_40}>25</Text>
          </View>
        </View>
        {/* //bottom */}
        <View style={styles.head_bottom}>
          <View style={styles.head_bottom_row}>
            <LinearGradient
              colors={activetab === 'deliveries' ? active_btn : inactive_btn}
              style={styles.button_active}>
              <TouchableOpacity
                onPress={() => setActive_tab('deliveries')}
                style={styles.button_row}>
                <Text style={Basestyle.bold_14}>Assigned Deliveries</Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={activetab === 'history' ? active_btn : inactive_btn}
              style={styles.button_active}>
              <TouchableOpacity
                onPress={() => setActive_tab('history')}
                style={styles.button_row}>
                <Text style={Basestyle.bold_14}>View All</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
      {/* headerbox ends */}
      {
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollview}>
          {activetab === 'deliveries' ? (
            <View>
              <View style={{marginTop: 30}}>
                <View style={Basestyle.row_space_between}>
                  <Text style={[styles.opaq2]}>Today</Text>
                </View>

                <View style={{marginTop: 15}}>
                  <ItemBox
                    idnumber="RA0492859"
                    status="in progress"
                    destination="Ikeja"
                    duedate="22, July 2020"
                    onPress={() =>
                      navigation.navigate('DispatchDetail', {
                        title: '# RA0492859',
                      })
                    }
                  />
                  <ItemBox
                    idnumber="RA0492859"
                    status="in progress"
                    destination="Ikeja"
                    duedate="22, July 2020"
                  />
                  <ItemBox
                    idnumber="RA0492859"
                    status="in progress"
                    destination="Ikeja"
                    duedate="22, July 2020"
                  />
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={{marginTop: 30}}>
                <View style={Basestyle.row_space_between}>
                  <Text style={[styles.opaq2]}>Today</Text>
                  <Text
                    onPress={() =>
                      navigation.navigate('ListAll', {
                        title: 'History',
                      })
                    }
                    style={[styles.opaq4]}>
                    SEE ALL
                  </Text>
                </View>

                <View style={{marginTop: 15}}>
                  <ItemBox
                    idnumber="RA0492859"
                    status="accepted"
                    destination="Lagos Island"
                    duedate="22, July 2020"
                    onPress={() =>
                      navigation.navigate('DispatchDetail', {
                        title: '# RA0492859',
                      })
                    }
                  />
                  <ItemBox
                    idnumber="RA0492859"
                    status="in progress"
                    destination="Ikeja"
                    duedate="22, July 2020"
                  />
                  <ItemBox
                    idnumber="RA0492859"
                    status="completed"
                    destination="Mainland"
                    duedate="22, July 2020"
                  />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <View style={Basestyle.row_space_between}>
                  <Text style={[styles.opaq2]}>Yesterday</Text>
                  <Text
                    onPress={() =>
                      navigation.navigate('ListAll', {
                        title: 'History',
                      })
                    }
                    style={[styles.opaq4]}>
                    SEE ALL
                  </Text>
                </View>
                <View style={{marginTop: 15}}>
                  <ItemBox
                    idnumber="RA0492859"
                    status="failed"
                    destination="Lagos Island"
                    duedate="22, July 2020"
                  />
                  <ItemBox
                    idnumber="RA0492859"
                    status="accepted"
                    destination="Ikeja"
                    duedate="22, July 2020"
                  />
                  <ItemBox
                    idnumber="RA0492859"
                    status="completed"
                    destination="Mainland"
                    duedate="22, July 2020"
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      }
    </View>
  );
};

export default Dashboard;
