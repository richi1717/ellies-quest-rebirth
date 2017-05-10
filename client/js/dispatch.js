let dispatch = () => {
  throw new Error('dispatch not initialized');
};

export function initializeDispatch(store) {
  dispatch = store.dispatch;
}

export default function (action) {
  dispatch(action);
}
