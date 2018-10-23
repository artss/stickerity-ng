/* eslint-disable react/default-props-match-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import Checkbox from 'react-toolbox/lib/checkbox';
import Dropdown from 'react-toolbox/lib/dropdown';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { eventType } from '../../../proptypes/event';
import { eventTypes, TODO } from '../../../constants/events';
import Sticker from '../../Sticker';
import DeleteDialogButton from '../../DeleteDialogButton';
import DebouncedInput from '../../DebouncedInput';

import s from './EventPage.css';

const dropdownTheme = {
  disabled: s.dropdownDisabled,
  templateValue: s.dropdownTemplateValue,
};

function DropdownItem({ label, icon }) {
  return (
    <div className={s.dropdownItem}>
      <FontIcon className={s.dropdownItemIcon} value={icon} />
      {label}
    </div>
  );
}

DropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const eventTypesList = Object.keys(eventTypes).map((key) => {
  const { title: label, icon } = eventTypes[key];
  return {
    value: Number(key),
    label,
    icon,
  };
});

export default class EventPage extends PureComponent {
  static propTypes = {
    ...eventType,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  static get defaultProps() {
    const now = new Date();

    return {
      type: TODO,
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate() + 1,
      hour: 8,
      min: 0,
    };
  }

  onInputChange = (value, e) => {
    const { name } = e.target;
    const {
      type,
      year,
      month,
      day,
      hour,
      min,
      annual,
      wholeDay,
      onChange,
    } = this.props;
    onChange({
      ...{
        type,
        year,
        month,
        day,
        hour,
        min,
        annual,
        wholeDay,
      },
      [name]: value,
    });
  };

  onDateChange = (date) => {
    const {
      type,
      hour,
      min,
      annual,
      wholeDay,
      onChange,
    } = this.props;
    onChange({
      ...{
        type,
        hour,
        min,
        annual,
        wholeDay,
      },
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  };

  render() {
    const {
      $listId,
      $id,
      title,
      description,
      type,
      year,
      month,
      day,
      hour,
      min,
      annual,
      wholeDay,
      onDelete,
    } = this.props;

    const date = new Date(year, month - 1, day, hour, min);

    const headTitle = title || (description ? description.substr(0, 16) : 'Event');

    // TODO: validation
    const titleError = $id && !title && !description && 'Ether title or description should be filled';

    return (
      <Sticker
        className={s.root}
        backUrl={`/lists/${$listId}`}
        title={headTitle}
      >
        <Helmet>
          <title>{headTitle}</title>
        </Helmet>

        <DeleteDialogButton
          className={s.deleteButton}
          title={title || headTitle}
          action={onDelete}
        >
          <FontIcon value="delete_outline" />
        </DeleteDialogButton>

        <DebouncedInput
          label="Title"
          name="title"
          value={title}
          onChange={this.onInputChange}
          error={titleError}
          autoFocus={!$id}
        />

        <DebouncedInput
          label="Description"
          multiline
          name="description"
          value={description}
          onChange={this.onInputChange}
        />

        <Dropdown
          label="Event type"
          source={eventTypesList}
          name="type"
          value={type}
          template={DropdownItem}
          onChange={this.onInputChange}
          theme={dropdownTheme}
        />

        <DatePicker
          label="Date"
          value={date}
          onChange={this.onDateChange}
          autoOk
        />

        <Checkbox
          label="Annual"
          name="annual"
          checked={annual}
          onChange={this.onInputChange}
        />

        <TimePicker
          inputClassName={cx(wholeDay && s.disabled)}
          label="Time"
          value={date}
          onChange={this.onDateChange}
        />

        <Checkbox
          label="Whole day"
          name="wholeDay"
          checked={wholeDay}
          onChange={this.onInputChange}
        />
      </Sticker>
    );
  }
}
