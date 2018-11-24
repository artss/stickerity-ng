import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Checkbox from 'react-toolbox/lib/checkbox';
import { IconButton } from 'react-toolbox/lib/button';

import DebouncedInput from '../../DebouncedInput';
import { checklistType } from '../../../proptypes/checklist';
import { ENTER, BACKSPACE } from '../../../constants/keys';

import s from './ChecklistList.css';

export default class ChecklistItem extends Component {
  static propTypes = {
    ...checklistType,
    focus: PropTypes.bool,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onInsert: PropTypes.func.isRequired,
  };

  static defaultProps = {
    focus: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      focus: props.focus || false,
      prevText: props.text,
    };
  }

  refItem = (el) => {
    const { $id, reference } = this.props;
    reference($id, el);
  }

  refInput = (el) => {
    this.input = el;
  }

  focus = () => {
    this.setState({ focus: true });
    this.input.focus();
  }

  toggleCheck = () => {
    const {
      $id,
      checked,
      onChange,
    } = this.props;

    onChange($id, { checked: !checked });
  };

  onInputChange = (text) => {
    const { $id, onChange } = this.props;
    onChange($id, { text });
  }

  onDelete = () => {
    const { $id, onDelete } = this.props;
    onDelete($id);
  }

  onFocus = () => {
    const { $id, onFocus } = this.props;
    onFocus($id);

    this.setState({ focus: true });
  }

  onBlur = () => {
    const { $id, onBlur } = this.props;
    onBlur($id);
    this.setState({ focus: false });
  }

  onKeyPress = (e) => {
    const { value } = e.target;

    const { $id, onDelete, onInsert } = this.props;
    const { prevText } = this.state;

    switch (e.nativeEvent.code) {
      case BACKSPACE:
        if (value === '' && prevText === '') {
          onDelete($id);
        }
        break;

      case ENTER:
        onInsert($id);
        break;

      default: break;
    }

    this.setState({ prevText: value });
  }

  render() {
    const { checked, text } = this.props;
    const { focus } = this.state;

    return (
      <div className={cx(s.item, focus && s.focus)}>
        <Checkbox
          className={s.checkbox}
          checked={checked}
          onChange={this.toggleCheck}
        />

        <DebouncedInput
          ref={this.refItem}
          className={s.input}
          value={text}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyUp={this.onKeyPress}
          onChange={this.onInputChange}
          autoFocus={focus}
        />

        <IconButton
          icon="clear"
          className={s.del}
          onClick={this.onDelete}
        />
      </div>
    );
  }
}
