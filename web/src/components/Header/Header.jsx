import React from 'react';
import { Link } from 'react-router-dom';

import UserMenu from './UserMenu';
import s from './Header.css';

export default function Header() {
  return (
    <header className={s.header}>
      <Link className={s.logo} to="/">
        STIKRS
      </Link>
      <UserMenu />
    </header>
  );
}
