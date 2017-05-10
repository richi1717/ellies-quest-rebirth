export default function (str, level) {
  return str + (Math.ceil((str + level) / 3.2) * Math.ceil((str * level) / 3.2));
}
