import React from 'react';

import Sticker from '../../components/Sticker';

import s from './Main.css';

export default function Main() {
  return (
    <Sticker className={s.root}>
      <div className={s.main}>
        <h1 className={s.header}>
          <span>STIK</span>
          <span className={s.tld}>RS</span>
        </h1>

        <div className={s.subheader}>
          What if we tell that keeping your passwords on stickers is <b>safe</b>?
        </div>
      </div>
    </Sticker>
  );
}
