import React, { Suspense, lazy } from 'react';
import cx from 'classnames';
import Input from 'react-toolbox/lib/input';

import DebouncedInput from '../DebouncedInput';
import s from './PasswordInput.css';

const PasswordInput = lazy(() => import(/* webpackChunkName: "password-input" */ './PasswordInput.impl'));

function PasswordInputFallback({
  debounced,
  checkOnMount,
  className,
  ...props
}) {
  return (
    <div className={cx(s.root, className)}>
      {debounced
        ? <DebouncedInput type="password" theme={s} {...props} />
        : <Input type="password" theme={s} {...props} />
      }
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
