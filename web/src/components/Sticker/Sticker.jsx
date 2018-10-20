import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import s from './Sticker.css';

export default class Sticker extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    backUrl: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
  };

  static defaultProps = {
    backUrl: null,
    title: null,
    className: null,
    children: null,
  };

  state = {};

  render() {
    const {
      className,
      backUrl,
      title,
      children,
    } = this.props;

    return (
      <div
        className={cx(s.sticker, className)}
      >

        {(backUrl || title) && (
          <h1 className={s.head}>
            {backUrl && (
              <Link to={backUrl} className={s.back}>
                <FontIcon className={s.backIcon} value="arrow_back" />
              </Link>
            )}

            {title && <div className={s.title}>{title}</div>}
          </h1>
        )}

        {children}
      </div>
    );
  }
}
