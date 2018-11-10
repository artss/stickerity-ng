import React from 'react';

import Sticker from '../../components/Sticker';

import s from './Terms.css';

export default function Terms() {
  return (
    <Sticker
      className={s.sticker}
      title="Terms of use"
    >
      <p>Stay tuned</p>
    </Sticker>
  );
}
