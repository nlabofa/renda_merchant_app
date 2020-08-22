/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StatusBar, Image, Text} from 'react-native';
import styles from './styles/dashboard_styles';
import {Basestyle, Images} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FloatingTextInput from '../../components/CustomInput/FloatingTextInput';
import ButtonMain from '../../components/Button/ButtonMain';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const WRONG_LISTS = [
  {id: 0, title: 'Wrong Delivery Information'},
  {id: 1, title: 'Couldn’t Reach Recipient'},
  {id: 2, title: 'Couldn’t deliver on time '},
  {id: 3, title: 'Recipient Rejected the Package'},
  {id: 4, title: 'Recipient wasn’t available'},
  {id: 5, title: 'Other Reason'},
];
const SubmitComplaint = ({navigation, route}) => {
  const {type} = route.params;
  const [activeindex, setActiveIndex] = useState('');

  const setIndex = (index) => {
    // console.log(index);
    setActiveIndex(index);
  };
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title={'Request #' + type}
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 50}}>
          <Text style={[styles.opaq5]}>What went wrong ?</Text>
          <View style={{marginTop: 40}}>
            {WRONG_LISTS.map(({id, title}) => (
              <TouchableOpacity
                onPress={() => setIndex(id)}
                key={id}
                style={styles.complaint_row}>
                <Image
                  source={
                    activeindex === id ? Images.checked : Images.unchecked
                  }
                  resizeMode="contain"
                  style={{width: 25, height: 25, marginRight: 20}}
                />
                <Text style={[styles.opaq6]}>{title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {activeindex === 5 && (
            <FloatingTextInput
              placeholder="What Happened"
              cutomwrapperInputStyle={{marginBottom: 30}}
            />
          )}
          {activeindex !== '' && (
            <ButtonMain
              onPress={() =>
                navigation.push('DispatchDetail', {
                  title: '# RA0492859',
                  failed: true,
                })
              }
              text="Submit"
              btnContainerStyle={{marginBottom: 20, marginTop: 40}}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SubmitComplaint;
