'use client';

import { useSyncExternalStore } from 'react';
import { Breakpoint, BREAKPOINTS } from '../lib';

type UseBreakpointOptions = {
  defaultValue?: boolean;
};

const useBreakpoint = (
  breakpoint: Breakpoint,
  options: UseBreakpointOptions = {},
): boolean => {
  const { defaultValue = false } = options;
  const query = BREAKPOINTS[breakpoint];

  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', callback);

    return () => {
      mediaQuery.removeEventListener('change', callback);
    };
  };

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => defaultValue;

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
};

export default useBreakpoint;
