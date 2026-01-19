import React, { ReactNode } from 'react';
import styles from './Badge.module.scss';

type BadgeProps = {
  text: string;
  icon?:ReactNode;
  className?: string;
};

function Badge({ text, icon, className }: BadgeProps) {
  return (
    <div className={`${styles.badge} ${className || ''}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </div>
  );
}

Badge.defaultProps = {
  icon: undefined,
  className: '',
};

export default Badge;
