import {debounce} from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should run supplied function after set time', () => {
    const fn = jest.fn();
    const debounced = debounce(fn);

    debounced();
    debounced();
    debounced();
    jest.runAllTimers();
    debounced();
    jest.runAllTimers();

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
