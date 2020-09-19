/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useState} from 'react';
import {
  Platform,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Picker,
  FlatList,
} from 'react-native';

import colors from '../../helpers/BaseThemes/colors';
import {Fontnames} from '../../helpers/BaseThemes';
import InputContainer from '../InputContainer';

const CustomDropdown = ({
  selectedOption,
  options,
  handleDropdownChange,
  valueKey,
  labelKey,
  containerStyle = {},
  inputTextStyle,
  defaultLabel = '',
  placeholder = '',
  errorMessage,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Fragment>
      <InputContainer
        label={defaultLabel}
        handlePress={() => setModalVisible(true)}
        placeholder={placeholder}
        value={selectedOption}
        errorMessage={errorMessage}
        cutomwrapperInputStyle={[containerStyle]}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        {Platform.OS === 'ios' ? (
          <View style={styles.modalContainer}>
            <SafeAreaView style={{backgroundColor: 'white'}}>
              <View style={styles.dropdownContent}>
                <Text
                  onPress={() => setModalVisible(false)}
                  style={styles.modalDoneText}>
                  Done
                </Text>
              </View>
              <Picker
                selectedValue={selectedOption}
                onValueChange={handleDropdownChange}>
                {options.map((option, index) => {
                  return (
                    <Picker.Item
                      key={index}
                      label={labelKey ? option[labelKey] : option}
                      value={valueKey ? option[valueKey] : option}
                    />
                  );
                })}
              </Picker>
            </SafeAreaView>
          </View>
        ) : (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={styles.androidModalContainer}>
            <View style={styles.modalView}>
              <FlatList
                keyExtractor={({item}, index) => `${item}-${index}`}
                showsVerticalScrollIndicator={false}
                data={options}
                style={{width: '100%'}}
                // ItemSeparatorComponent={() => {
                //   return <View style={styles.separator} />;
                // }}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (item[labelKey] !== null) {
                        handleDropdownChange(item[valueKey]);
                        setModalVisible(false);
                      }
                    }}
                    style={styles.itemStyle}>
                    <Text>{item[labelKey]}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        )}
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingHorizontal: 16,
    backgroundColor: '#F4F8FB',
  },
  modalContainer: {flex: 1, justifyContent: 'flex-end'},
  androidModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  modalView: {
    width: '100%',
    maxHeight: '50%',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalDoneText: {
    fontSize: 16,
    fontFamily: Fontnames.medium,
    lineHeight: 16,
    // height: 16,
    color: '#270450',
  },
  dropdownContent: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomColor: '#eef0f1',
    borderBottomWidth: 1,
  },
  itemStyle: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  separator: {height: 15, width: '100%'},
  arrowStyle: {
    marginBottom: 7,
  },
  retryContainer: {
    minHeight: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryText: {
    fontSize: 12,
    marginTop: 10,
    color: colors.DEEP_GREY_0,
    textAlign: 'center',
  },
});

export default CustomDropdown;
