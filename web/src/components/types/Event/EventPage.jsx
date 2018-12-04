/* eslint-disable react/default-props-match-prop-types */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-toolbox/lib/date_picker';
// import TimePicker from 'react-toolbox/lib/time_picker';
import Checkbox from 'react-toolbox/lib/checkbox';
import Dropdown from 'react-toolbox/lib/dropdown';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { eventType } from '../../../proptypes/event';
import { eventTypes, TODO } from '../../../constants/events';
import { pick } from '../../../util/objects';
import range from '../../../util/range';
import { formatTime } from '../../../util/format';
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

const timeList = range(0, 23, 0.5).map((h) => {
  const hour = Math.floor(h);
  const min = hour === h ? 0 : 30;
  const t = formatTime(hour, min);
  return { value: t, label: t };
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

  getItem() {
    return pick(this.props, ['type', 'year', 'month', 'day', 'hour', 'min', 'annual', 'wholeDay']);
  }

  onInputChange = (value, e) => {
    const { name } = e.target;
    const { onChange } = this.props;
    onChange({
      ...this.getItem(),
      [name]: value,
    });
  }

  onDateChange = (date) => {
    const { onChange } = this.props;
    onChange({
      ...this.getItem(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  }

  onTimeChange = (value) => {
    const [hour, min] = value.split(':').map(Number);
    const { onChange } = this.props;
    onChange({
      ...this.getItem(),
      hour,
      min,
    });
  }

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

        <div className={s.field}>
          <DatePicker
            label="Date"
            value={date}
            onChange={this.onDateChange}
            autoOk
          />

          <Checkbox
            label="Annual"
            className={s.checkbox}
            name="annual"
            checked={annual}
            onChange={this.onInputChange}
          />
        </div>

        <div className={s.field}>
          {/*
          <TimePicker
            inputClassName={cx(wholeDay && s.disabled)}
            label="Time"
            value={date}
            onChange={this.onDateChange}
          />
          */}

          <Dropdown
            label="Time"
            source={timeList}
            value={formatTime(hour, min)}
            onChange={this.onTimeChange}
          />

          <Checkbox
            label="Whole day"
            className={s.checkbox}
            name="wholeDay"
            checked={wholeDay}
            onChange={this.onInputChange}
          />
        </div>
      </Sticker>
    );
  }
}
