import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import DatePickerStyle from './styles';

const DatePicker = React.memo(
  ({
    value: selectedDate,
    onSelect = () => null,
    minimumDate,
    maximumDate,
    labelElement = null,
    outsideModalVisibility = false,
    containerStyle = {},
    dateMode = 'date',
  }) => {
    const [date, setDate] = React.useState(selectedDate);
    const [pickerVisibility, setPickerVisibility] = useState(false);

    useEffect(() => {
      setPickerVisibility(outsideModalVisibility);
    }, [outsideModalVisibility]);

    const changeDate = (e, newDate) => {
      newDate = newDate || date;
      if (Platform.OS === 'android') {
        setPickerVisibility(false);
        if (e.type !== 'dismissed') {
          setDate(newDate);
          onSelect(newDate);
        }
      } else {
        setDate(newDate);
      }
    };

    const selectDate = () => {
      closePicker();
      onSelect(date);
    };

    const closePicker = () => {
      setPickerVisibility(false);
    };

    const openPicker = () => {
      setPickerVisibility(true);
    };

    const dateString = Moment(date).format('DD MMMM, YYYY');

    return (
      <View style={[{minHeight: 40}, containerStyle]}>
        <TouchableOpacity
          onPress={openPicker}
          style={DatePickerStyle.container}>
          {labelElement ? (
            labelElement
          ) : (
            <Text style={DatePickerStyle.text1}>{dateString}</Text>
          )}
        </TouchableOpacity>

        {Platform.OS === 'android' && pickerVisibility && (
          <DateTimePicker
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            mode={dateMode}
            value={date}
            onChange={changeDate}
          />
        )}

        {Platform.OS === 'ios' && (
          <Modal
            style={DatePickerStyle.modal}
            isVisible={pickerVisibility}
            onBackdropPress={closePicker}
            onBackButtonPress={closePicker}>
            <SafeAreaView style={DatePickerStyle.content}>
              <View style={DatePickerStyle.view2}>
                <Text onPress={selectDate} style={DatePickerStyle.text2}>
                  Done
                </Text>
              </View>
              <DateTimePicker
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                mode={dateMode}
                value={date}
                onChange={changeDate}
              />
            </SafeAreaView>
          </Modal>
        )}
      </View>
    );
  },
);

export default DatePicker;
