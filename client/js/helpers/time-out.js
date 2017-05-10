export default function setTimeOutHelper(time, func, arg1, arg2) {
  return setTimeout(() => {
    func(arg1, arg2);
  }, time);
}
