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
