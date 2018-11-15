import React, { Suspense, lazy } from 'react';
import cx from 'classnames';
import Input from 'react-toolbox/lib/input';

import s from './PasswordInput.css';

const PasswordInput = lazy(() => import(/* webpackChunkName: "password-input" */ './PasswordInput.impl'));

function PasswordInputFallback({ checkOnMount, className, ...props }) {
  return (
    <div className={cx(s.root, className)}>
      <Input type="password" theme={s} {...props} />
    </div>
  );
}

export default function PasswordInputLoader(props) {
  const fallback = <PasswordInputFallback {...props} />;

  return (
    <Suspense fallback={fallback}>
      <PasswordInput {...props} />
    </Suspense>
  );
}
