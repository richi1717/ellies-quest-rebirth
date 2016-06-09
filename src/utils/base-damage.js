export default function (str, level, ) {
  return str + (_.ceil((str + level) / 3.2) * _.ceil((str * level) / 3.2));
}
