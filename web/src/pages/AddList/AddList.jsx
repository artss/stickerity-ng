import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import cx from 'classnames';
import { Helmet } from 'react-helmet';

import Sticker from '../../components/Sticker';

import s from './AddList.css';

export default class AddList extends PureComponent {
  static propTypes = {
  };

  static defaultProps = {};

  state = {};

  render() {
    const title = 'Add List';

    return (
      <Sticker
        className={s.root}
        backUrl="/"
        title={title}
      >
        <Helmet>
          <title>{title}</title>
        </Helmet>

        add list
      </Sticker>
    );
  }
}
