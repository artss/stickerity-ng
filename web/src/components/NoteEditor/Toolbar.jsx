import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { IconButton } from 'react-toolbox/lib/button';

import s from './NoteEditor.css';

const TOGGLES = [
  { icon: 'format_bold', style: 'BOLD' },
  { icon: 'format_italic', style: 'ITALIC' },
  { icon: 'format_underline', style: 'UNDERLINE' },
  // { icon: 'format_clear', style: 'CLEAR' },
];

export default class Toolbar extends PureComponent {
  static propTypes = {
    position: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
    }),
    onToggle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    position: null,
  };

  constructor(props) {
    super(props);

    this.toggles = TOGGLES.reduce(
      (toggles, { style }) => ({
        ...toggles,
        [style]: () => props.onToggle(style),
      }),
      {}
    );
  }

  getRect() {
    return this.toolbar.getBoundingClientRect();
  }

  refToolbar = (el) => {
    this.toolbar = el;
  }

  render() {
    const { position } = this.props;

    return (
      <div
        ref={this.refToolbar}
        className={cx(s.toolbar, !position && s.hidden)}
        style={position}
      >
        {TOGGLES.map(({ icon, style }) => (
          <IconButton
            key={style}
            className={s.button}
            icon={icon}
            ripple
            onMouseDown={this.toggles[style]}
          />
        ))}
      </div>
    );
  }
}
