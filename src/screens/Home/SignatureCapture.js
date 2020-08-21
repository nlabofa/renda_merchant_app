/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {View, StatusBar, Text} from 'react-native';
import styles from './styles/dispatch_detail';
import {Basestyle} from '../../helpers/BaseThemes';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReuseHeader from '../../components/Header/index';
import Signature from 'react-native-signature-canvas';
import ButtonMain from '../../components/Button/ButtonMain';

const SignatureCapture = ({navigation, route, text = 'testete', onOK}) => {
  const ref = useRef();

  const handleSignature = (signature) => {
    console.log(signature);
    // setSign(signature);
  };
  const handleEnd = () => {
    ref.current.readSignature();
  };
  const handleEmpty = () => {
    console.log('Empty');
  };
  const webStyle = `.m-signature-pad--footer
	.save {
		display: none;
	}
	.clear {
		display: none;
  }
`;
  return (
    <SafeAreaView style={Basestyle.container_with_space}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <ReuseHeader
        title="Signature"
        navigation={navigation}
        textStyle={{letterSpacing: 0.9}}
      />
      <View style={{flex: 1}}>
        <View style={{height: '70%', marginTop: 40}}>
          <Signature
            ref={ref}
            onOK={handleSignature}
            onEnd={handleEnd}
            onEmpty={handleEmpty}
            descriptionText=""
            webStyle={webStyle}
          />
        </View>
        <ButtonMain
          onPress={() =>
            navigation.push('DispatchDetail', {
              title: '# RA0492859',
              completed: true,
            })
          }
          text="Confirm Signature"
          btnContainerStyle={{marginBottom: 20, marginVertical: 30}}
        />
        <Text
          onPress={() => ref.current.clearSignature()}
          style={styles.reset_signature}>
          Reset Signature
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignatureCapture;
