export default function fibonacci(startAtZero, times = 10) {
  const numerator = times - 2;
  const arr = startAtZero ? [0, 1] : [1, 1];
  let i = 0;
  while (i < numerator) {
    arr.push(arr[i] + arr[i + 1]);
    i++;
  }
  return arr;
}

