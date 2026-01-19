'use client';

import React from 'react';
import { useBreakpoint } from '../../shared';
import Header from './Header';

function HeaderWrapper() {
  const isMobile = useBreakpoint('mobile', { defaultValue: false });

  if (isMobile) {
    return null;
  }

  return <Header />;
}

export default HeaderWrapper;
