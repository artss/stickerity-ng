import React, { PureComponent } from 'react';
import Sticker from '../Sticker';

import s from './PageNotFound.css';

export default class PageNotFound extends PureComponent {
  static propTypes = {
  };

  static defaultProps = {};

  state = {};

  render() {
    return (
      <Sticker className={s.root}>
        <h1 className={s.title}>Page not found</h1>
      </Sticker>
    );
  }
}
