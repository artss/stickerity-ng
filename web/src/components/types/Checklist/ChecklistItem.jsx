import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Checkbox from 'react-toolbox/lib/checkbox';
import { IconButton } from 'react-toolbox/lib/button';

import DebouncedInput from '../../DebouncedInput';
import { checklistType } from '../../../proptypes/checklist';

import s from './ChecklistList.css';

export default class ChecklistItem extends Component {
  static propTypes = {
    ...checklistType,
    focus: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    focus: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      focus: props.focus || false,
    };
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
    this.setState({ focus: true });
  }

  onBlur = () => {
    this.setState({ focus: false });
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
          className={s.input}
          value={text}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
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
