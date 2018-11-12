import React from 'react';

import UserMenu from './UserMenu';
import s from './Header.css';

export default function Header() {
  return (
    <header className={s.header}>
      <a className={s.logo} href="/">Stickerity</a>
      <UserMenu />
    </header>
  );
}
