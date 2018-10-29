import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import FontIcon from 'react-toolbox/lib/font_icon';
import Checkbox from 'react-toolbox/lib/checkbox';
import Input from 'react-toolbox/lib/input';
import { IconButton } from 'react-toolbox/lib/button';

import { checklistType } from '../../../proptypes/checklist';

import s from './ChecklistList.css';

export default class ChecklistItem extends Component {
  static propTypes = {
    ...checklistType,
    reference: PropTypes.func.isRequired,
    focus: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragStop: PropTypes.func.isRequired,
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

  reference = (el) => {
    const { $id, reference } = this.props;
    reference($id, el);
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

  onDragStart = (e) => {
    const { $id, onDragStart } = this.props;
    onDragStart($id, e);
  }

  onDragStop = (e) => {
    const { $id, onDragStop } = this.props;
    onDragStop($id, e);
  }

  render() {
    const { checked, text } = this.props;
    const { focus } = this.state;

    return (
      <li className={cx(s.item, focus && s.focus)} ref={this.reference}>
        <button
          type="button"
          className={s.handle}
          onMouseDown={this.onDragStart}
          onMouseUp={this.onDragStop}
          tabIndex={-1}
        >
          <FontIcon value="drag_indicator" />
        </button>

        <Checkbox
          className={s.checkbox}
          checked={checked}
          onChange={this.toggleCheck}
        />

        <Input
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
      </li>
    );
  }
}
