import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import copy from 'copy-to-clipboard';
import { Button } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon';
import { Snackbar } from 'react-toolbox/lib/snackbar';
import Tooltip from 'react-toolbox/lib/tooltip';

import s from './CopyButton.css';

const TooltipButton = Tooltip(Button);

const COPIED_TIMEOUT = 2000;

export default class Copy extends PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    tooltip: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    tooltip: null,
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
    const { children, className, tooltip } = this.props;
    const { copied } = this.state;

    return (
      <Fragment>
        <TooltipButton
          className={cx(s.button, className)}
          onClick={this.copy}
          tooltip={tooltip}
        >
          {copied
            ? (
              <div className={s.copied}>
                <FontIcon value="check" />
              </div>
            )
            : children
          }
        </TooltipButton>

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
