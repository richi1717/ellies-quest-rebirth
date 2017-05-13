import dispatch, { initializeDispatch } from '../js/dispatch';

describe('dispatch', () => {
  test('should throw new Error', () => {
    expect(() => {
      dispatch();
    }).toThrow(new Error('dispatch not initialized'));
  });

  test('iniitializeDispatch should set dispatch to store.dispatch', () => {
    const dispatchMock = jest.fn();
    initializeDispatch({ dispatch: dispatchMock });
    dispatch('coolAction');
    expect(dispatchMock).toHaveBeenCalledWith('coolAction');
  });
});
