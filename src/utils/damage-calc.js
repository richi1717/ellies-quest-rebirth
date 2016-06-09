import _ from 'lodash';

export default function (p, def, str) {
  return _.ceil(((p * (512 - def) * str) / (1.6 * 512)) + _.random((str / def)));
}
