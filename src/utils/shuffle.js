import _ from 'lodash';

export default (data) => {
  data = _.shuffle(data);
  return data;
};
