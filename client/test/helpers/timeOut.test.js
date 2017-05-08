import { expect, assert } from 'chai';
import { setTimeOutHelper } from '../../src/utils/time-out';
import sinon from 'sinon';

describe('timeout helper function', () => {
  it('should call the function passed in after a certain amount of time', sinon.test(function () {
    function tester(x, y) {
      return x + y;
    }
    const setTimeOutHelperSpy = this.spy(setTimeOutHelper);
    const testerSpy = this.spy(tester);
    const clock = sinon.useFakeTimers();
    setTimeOutHelperSpy(1000, testerSpy, 5, 6);
    clock.tick(1001);
    assert(setTimeOutHelperSpy.calledOnce, 'setTimeOutHelper was called');
    assert(testerSpy.calledOnce, 'setTimeout waited and called the function passed to it');
    assert(testerSpy.calledAfter(setTimeOutHelperSpy), 'setTimeout waited and called the function passed to it');
    assert(testerSpy.calledWith(5, 6));
    clock.restore();
  }));
});
