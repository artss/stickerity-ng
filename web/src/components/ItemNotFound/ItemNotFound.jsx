import React, { PureComponent } from 'react';
import Sticker from '../Sticker';

import s from './ItemNotFound.css';

export default class ItemNotFound extends PureComponent {
  static propTypes = {
  };

  static defaultProps = {};

  state = {};

  render() {
    return (
      <Sticker className={s.root}>
        <h1 className={s.title}>Item not found</h1>
      </Sticker>
    );
  }
}
