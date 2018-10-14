import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import copy from 'copy-to-clipboard';
import { Button } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon';
import { Snackbar } from 'react-toolbox/lib/snackbar';

import s from './CopyButton.css';

const COPIED_TIMEOUT = 2000;

export default class Copy extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  state = {
    copied: false,
  };

  copy = () => {
    const { text } = this.props;
    copy(text);
    this.setState({ copied: true });

    this.resetTimeout = setTimeout(
      () => this.setState({ copied: false }),
      COPIED_TIMEOUT
    );
  }

  reset = () => {
    clearTimeout(this.resetTimeout);
    this.setState({ copied: false });
  }

  render() {
    const { children, className } = this.props;
    const { copied } = this.state;

    return (
      <Fragment>
        <Button
          className={cx(s.button, className)}
          onClick={this.copy}
        >
          {copied
            ? (
              <div className={s.copied}>
                <FontIcon value="check" />
              </div>
            )
            : children
          }
        </Button>

        <Snackbar
          type="accept"
          action="Dismiss"
          label="Copied"
          active={copied}
          timeout={COPIED_TIMEOUT}
          onClick={this.reset}
        />
      </Fragment>
    );
  }
}
