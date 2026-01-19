'use client';

import React, { ReactNode } from 'react';
import styles from './InfoBlock.module.scss';
import { Badge, useBreakpoint } from '../../shared';

type InfoBlockProps = {
  title?: string;
  description?: string;
  badgeText?: string;
  badgeIcon?: ReactNode;
  className?: string;
};

function InfoBlock({
  title,
  description,
  badgeText,
  badgeIcon,
  className,
}: InfoBlockProps) {
  const isMobile = useBreakpoint('mobile', { defaultValue: false });

  if (!isMobile) {
    return null;
  }

  return (
    <div className={`${styles.infoBlock} ${className || ''}`}>
      <div className={styles.content}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {(badgeText || badgeIcon) && (
        <Badge icon={badgeIcon} text={badgeText || ''} />
      )}
    </div>
  );
}

InfoBlock.defaultProps = {
  title: undefined,
  description: undefined,
  badgeText: undefined,
  badgeIcon: undefined,
  className: '',
};

export default InfoBlock;
