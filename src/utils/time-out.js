export function setTimeOutHelper(time, func, arg1, arg2) {
  setTimeout(function () {
    func(arg1, arg2);
  }, time);
}
