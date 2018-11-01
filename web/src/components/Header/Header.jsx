import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">Stickerity</Link>
    </header>
  );
}
