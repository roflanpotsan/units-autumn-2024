import { renderHook, act } from '@testing-library/react';
import { useCurrentTime } from '../useCurrentTime';

let dateSpy: jest.SpyInstance;

beforeAll(() => {
    dateSpy = jest
        .spyOn(Date.prototype, 'toLocaleTimeString')
        .mockImplementation(() => '12:00:00');
});

afterAll(() => {
    dateSpy.mockRestore();
});

describe('useCurrentTime initial time', () => {
    it('should return the current time initially', () => {
        const { result } = renderHook(() => useCurrentTime());
        expect(result.current).toBe('12:00:00');
    });
});

describe('useCurrentTime updated', () => {
    it('should update the time every second', () => {
        jest.useFakeTimers();

        const { result } = renderHook(() => useCurrentTime());

        act(() => {
            dateSpy.mockImplementation(() => '12:00:01');
            jest.advanceTimersByTime(1000);
        });

        expect(result.current).toBe('12:00:01');
    });
});

describe('useCurrentTime unmount', () => {
    it('should clear the interval on unmount', () => {
        jest.useFakeTimers();
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

        const { unmount } = renderHook(() => useCurrentTime());

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    });
});
