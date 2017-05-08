let dispatch = function () {
  throw 'dispatch not initialized';
};

export function initializeDispatch (store) {
  dispatch = store.dispatch;
}

export default function (action) {
  dispatch(action);
}