/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {View, StatusBar, Image, ScrollView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles/dispatch_detail';
import {Basestyle, Images, colors} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import ProgressBar from 'react-native-progress/Bar';
import ButtonMain from '../../components/Button/ButtonMain';

const DispatchDetail = ({navigation, route}) => {
  const scrollViewRef = useRef(null);
  const [progressvalue, setprogressvalue] = useState(0);
  const [tripstarted, setripstarted] = useState(false);
  const {title, completed, failed} = route.params;

  useEffect(() => {
    completed && completed === true ? setprogressvalue(1) : null;
  }, [completed]);
  const startTrip = () => {
    if (completed || failed) {
      navigation.navigate('Dashboard');
    } else {
      setprogressvalue(0.5);
      if (!tripstarted) {
        setripstarted(true);
        setTimeout(() => {
          scrollViewRef.current.scrollToEnd({animated: true});
        }, 500);
      } else {
        navigation.navigate('SignatureCapture');
      }
    }
  };
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title={title}
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <ScrollView
        ref={scrollViewRef}
        style={{marginTop: 30}}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={Basestyle.round_box}>
            <Image
              source={Images.dashed_line}
              resizeMode="contain"
              style={styles.dashed_line}
            />
            <View style={styles.content}>
              <View style={styles.row_top}>
                <Text style={styles.row_top_text}>Pick Up Location</Text>
                <View style={styles.hr} />
              </View>
              <View style={{marginTop: 15}}>
                <View style={styles.address_row}>
                  <Ionicons
                    name="location-sharp"
                    size={25}
                    color="#FFAF2A"
                    style={styles.location_icon}
                  />
                  <Text numberOfLines={2} style={styles.address}>
                    9 Jinadu Street, Igboefon, Lagos State
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.profile_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>Tobi Afolabi</Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.cell_phone_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>09027371303</Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.chat_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={2} style={styles.small_icon_text}>
                      Call recipient once you are 3 bustops away
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.row_top}>
                <Text style={styles.row_top_text}>Drop Off Location</Text>
                <View style={styles.hr} />
              </View>
              <View style={{marginTop: 15}}>
                <View style={styles.address_row}>
                  <Ionicons
                    name="location-sharp"
                    size={25}
                    color={colors.PRIMARY_PURPLE}
                    style={styles.location_icon}
                  />
                  <Text numberOfLines={2} style={styles.address}>
                    9 Jinadu Street, Igboefon, Lagos State
                  </Text>
                </View>

                <View style={{marginTop: 20}}>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.profile_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>Tobi Afolabi</Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.cell_phone_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text style={styles.small_icon_text}>09027371303</Text>
                  </View>
                  <View style={styles.small_icon_view}>
                    <Image
                      source={Images.chat_icon_grey}
                      resizeMode="contain"
                      style={styles.small_icon}
                    />
                    <Text numberOfLines={2} style={styles.small_icon_text}>
                      Call recipient once you are 3 bustops away
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 0}}>
          <View style={{width: '100%', flex: 1}}>
            <Image
              source={Images.progressbar_line}
              resizeMode="contain"
              style={styles.progressbar_line}
            />
            {failed ? (
              <Text style={styles.progress_text}>UNABLE TO COMPLETE</Text>
            ) : (
              <Text style={styles.progress_text}>
                {progressvalue * 100}% COMPLETED
              </Text>
            )}

            <ProgressBar
              width={null}
              height={40}
              thickness={5}
              progress={progressvalue}
              color="#0098A0"
              unfilledColor={failed ? '#434856' : '#063A4F'}
              borderWidth={0}
              //strokeCap="square"
              style={{marginVertical: 30, borderRadius: 4}}
            />
          </View>

          <ButtonMain
            onPress={() => startTrip()}
            text={
              completed || failed
                ? 'Go to Dashboard'
                : tripstarted
                ? 'Dispatch was Successsful'
                : 'Start Trip'
            }
            btnContainerStyle={{marginBottom: 20}}
          />
          {tripstarted && (
            <ButtonMain
              errorbtn
              onPress={() =>
                navigation.push('SubmitComplaint', {type: '234566'})
              }
              text="Something went wrong "
              btnContainerStyle={{marginBottom: 20}}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DispatchDetail;
