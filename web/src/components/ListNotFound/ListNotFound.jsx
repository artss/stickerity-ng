import React, { PureComponent } from 'react';
import Sticker from '../Sticker';

import s from './ListNotFound.css';

export default class ListNotFound extends PureComponent {
  static propTypes = {
  };

  static defaultProps = {};

  state = {};

  render() {
    return (
      <Sticker className={s.root}>
        <h1 className={s.title}>List not found</h1>
      </Sticker>
    );
  }
}
