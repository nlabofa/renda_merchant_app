import moment from 'moment';

export const getMinDate = () => {
  const currentDate = new Date();
  const minYearAllowed = currentDate.getFullYear() - 18;
  const minDate = `${minYearAllowed}-${
    currentDate.getMonth() + 1
  }-${currentDate.getDate()}`;

  return moment(minDate, 'YYYY-MM-DD').toDate();
};

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneNumberRegex = /^[0]\d{10}$/;
export const formatPhoneNumber = (countrycode, phone_no) => {
  if (countrycode === '+234' && phone_no.startsWith('0')) {
    const stripped = phone_no.replace(/^0/, ''); //strip leading 0
    return countrycode + stripped;
  } else {
    return countrycode + phone_no;
  }
};

export const formatMoney = (amount = '') => {
  amount = amount.toString();
  if (amount.length === 0) {
    return amount;
  }

  const currency = '\u20A6';
  let newString = amount;
  if (isNaN(Number(amount[0])) || amount[0] === '0') {
    newString = newString.substring(1, newString.length);
    if (newString === '') {
      return newString;
    }
  }

  const dotPosition = amount.indexOf('.');
  if (dotPosition !== -1) {
    if (amount.length - dotPosition > 3) {
      newString = Number(amount).toFixed(2);
    }
  }

  if (amount.length < 4) {
    return currency + newString;
  }

  let mainText = newString;
  if (dotPosition !== -1) {
    mainText = newString.substring(0, dotPosition);
  }

  let processedStr = '';
  let count = 0;
  for (let i = mainText.length - 1; i >= 0; i--) {
    processedStr = mainText[i] + processedStr;
    count += 1;
    if (count === 3 && i > 0) {
      processedStr = ',' + processedStr;
      count = 0;
    }
  }

  if (dotPosition !== -1) {
    const decimals = newString.substring(dotPosition, amount.length);
    return currency + processedStr + decimals;
  }

  return currency + processedStr;
};
