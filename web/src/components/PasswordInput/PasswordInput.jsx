import React, { PureComponent } from 'react';
import cx from 'classnames';
import Input from 'react-toolbox/lib/input';

import s from './PasswordInput.css';

export default class PasswordInputLoader extends PureComponent {
  state = {
    Component: null,
  };

  async componentDidMount() {
    const { default: Component } = await import(/* webpackChunkName: "password-input" */ './PasswordInput.impl');
    setTimeout(() => this.setState({ Component }), 2000);
  }

  render() {
    const { Component } = this.state;
    const { checkOnMount, className, ...props } = this.props;

    return Component
      ? <Component {...this.props} />
      : (
        <div className={cx(s.root, className)}>
          <Input type="password" theme={s} {...props} />
        </div>
      );
  }
}
