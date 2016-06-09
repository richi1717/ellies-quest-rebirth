export default function(time, func, arg1, arg2) {
  setTimeout(function () {
    func(arg1, arg2);
  }, time);
}
