import _ from 'lodash';

export default (data) => {
  let sortedCards = _.orderBy(data, function (obj) {
    if (obj.roll.length > 0) {
      return obj.roll[0];
    } else {
      return obj.roll;
    }
  });
  sortedCards = _.orderBy(sortedCards, function (obj) {
    if (obj.roll.length > 0) {
      return obj.roll[1];
    } else {
      return obj.roll;
    }
  });
  return sortedCards;
};
