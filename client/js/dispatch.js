let dispatch = () => {
  throw new Error('dispatch not initialized');
};

let getter = () => {
  throw new Error('getState not initialized');
};

export function initializeDispatch(store) {
  dispatch = store.dispatch;
  getter = store.getState;
}

export default function (action) {
  dispatch(action);
}

export const getState = () => getter();
