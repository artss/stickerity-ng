import React from 'react';

import Sticker from '../../components/Sticker';

import s from './Main.css';

export default function Main() {
  return (
    <Sticker
      className={s.sticker}
      title="Welcome back, motherfuckers!"
    >
      <p>Some important info is gonna appear here</p>
    </Sticker>
  );
}
