import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import Input from 'react-toolbox/lib/input';
import { IconButton } from 'react-toolbox/lib/button';

import s from './PasswordInput.css';

const scoreMap = {
  '-1': {
    className: 'tooShort',
    text: 'Too short',
  },

  0: {
    className: 'veryWeak',
    text: 'Very weak',
  },

  1: {
    className: 'weak',
    text: 'Weak',
  },

  2: {
    className: 'medium',
    text: 'Medium',
  },

  3: {
    className: 'good',
    text: 'Good',
  },

  4: {
    className: 'strong',
    text: 'Strong',
  },
};

export default class PasswordInput extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: null,
  };

  state = {
    score: null,
    warning: null,
    showPassword: false,
  };

  togglePassword = () => {
    this.setState(({ showPassword }) => ({ showPassword: !showPassword }));
  }

  onChange = (password, ...args) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(password, ...args);
    }

    let score;
    let warning;

    if (!password) {
      score = -1;
    } else {
      const { score: sc, feedback = {} } = zxcvbn(password);
      score = sc;
      ({ warning } = feedback);
    }

    this.setState({ score, warning });
  }

  renderError() {
    const { score, warning } = this.state;

    if (score === null) {
      return null;
    }

    return (
      <span className={s[scoreMap[score].className]}>
        {scoreMap[score].text}
        {warning && `: ${warning}`}
      </span>
    );
  }

  render() {
    const { onChange, error, ...props } = this.props;
    const { showPassword } = this.state;

    return (
      <div className={s.root}>
        <Input
          type={showPassword ? 'text' : 'password'}
          theme={s}
          onChange={this.onChange}
          error={error}
          {...props}
        >
          <IconButton
            className={s.toggleButton}
            icon={showPassword ? 'visibility_off' : 'visibility'}
            onClick={this.togglePassword}
          />
        </Input>

        {!error && this.renderError()}
      </div>
    );
  }
}
