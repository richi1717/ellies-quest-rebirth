export function setTimeOutHelper(time, func, arg1, arg2) {
  return setTimeout(function () {
    func(arg1, arg2);
  }, time);
}
