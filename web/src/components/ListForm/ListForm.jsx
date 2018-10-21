import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-toolbox/lib/dropdown';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { listType } from '../../proptypes/list';
import { itemType } from '../../proptypes/item';
import { listTypes } from '../../constants/lists';
import { getIcon } from '../types';
import DebouncedInput from '../DebouncedInput';

import s from './ListForm.css';

const dropdownTheme = {
  disabled: s.dropdownDisabled,
  templateValue: s.dropdownTemplateValue,
};

function DropdownItem({ value, label }) {
  return (
    <div className={s.dropdownItem}>
      <FontIcon className={s.dropdownItemIcon} value={getIcon(value)} />
      {label}
    </div>
  );
}

DropdownItem.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default class ListForm extends PureComponent {
  static propTypes = {
    ...listType,
    items: PropTypes.arrayOf(PropTypes.shape(itemType)).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  onChange = (value, e) => {
    const { onChange } = this.props;
    const { name } = e.target;
    onChange(name, value);
  }

  render() {
    const { $type, title, items } = this.props;

    return (
      <div>
        <DebouncedInput
          label="Title"
          name="title"
          value={title}
          onChange={this.onChange}
        />

        <Dropdown
          label="List type"
          source={listTypes}
          name="$type"
          value={$type}
          template={DropdownItem}
          onChange={this.onChange}
          disabled={items.length > 0}
          theme={dropdownTheme}
        />
      </div>
    );
  }
}
