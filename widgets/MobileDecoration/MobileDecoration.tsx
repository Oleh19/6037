'use client';

import React from 'react';
import { MobileAvatar, useBreakpoint } from '../../shared';
import styles from './MobileDecoration.module.scss';

function MobileDecoration() {
  const isMobile = useBreakpoint('mobile', { defaultValue: false });

  if (!isMobile) {
    return null;
  }

  return (
    <div className={styles.mobileCircle}>
      <div className={styles.mobileAvatar}>
        <MobileAvatar />
      </div>
    </div>
  );
}

export default MobileDecoration;
