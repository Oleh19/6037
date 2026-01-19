import React from 'react';
import styles from './Header.module.scss';

type HeaderProps = {
  title?: string;
};

function Header({ title }: HeaderProps) {
  return (
    <header className={styles.siteHeader}>
      <span className={styles.siteHeaderTitle}>
        {title}
      </span>
    </header>
  );
}

Header.defaultProps = {
  title: '6037 Venture Partnership',
};

export default Header;
