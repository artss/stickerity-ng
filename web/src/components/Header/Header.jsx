import React from 'react';

import styles from './Header.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.logo} href="/">Stickerity</a>
    </header>
  );
}
