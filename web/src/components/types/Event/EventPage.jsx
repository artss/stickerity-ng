import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';
import { Helmet } from 'react-helmet';
import DatePicker from 'react-toolbox/lib/date_picker';
import TimePicker from 'react-toolbox/lib/time_picker';
import Checkbox from 'react-toolbox/lib/checkbox';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import { eventType, eventDefaultProps } from '../../../proptypes/event';
import { updateItem, deleteItem } from '../../../actions/items';
import { navigate } from '../../../util/history';
import Sticker from '../../Sticker';
import DeleteDialogButton from '../../DeleteDialogButton';
import DebouncedInput from '../../DebouncedInput';

import s from './EventPage.css';

class EventPage extends PureComponent {
  static propTypes = {
    ...eventType,
    updateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  static defaultProps = eventDefaultProps;

  onInputChange = (value, ev) => {
    const { name } = ev.target;
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { [name]: value });
  };

  onDateChange = (date) => {
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  };

  onDelete = () => {
    const { $listId, $id, deleteItem: del } = this.props;
    navigate(`/lists/${$listId}`, null, true);
    del($listId, $id);
  }

  render() {
    const {
      $listId,
      // $id,
      title,
      description,
      year,
      month,
      day,
      hour,
      min,
      annual,
      wholeDay,
    } = this.props;

    const date = new Date(year, month - 1, day, hour, min);

    const headTitle = title || (description ? description.substr(0, 16) : 'Event');

    // TODO: validation
    const titleError = !title && !description && 'Ether title or description should be filled';

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
          action={this.onDelete}
        >
          <FontIcon value="delete_outline" />
        </DeleteDialogButton>

        <DebouncedInput
          label="Title"
          name="title"
          value={title}
          onChange={this.onInputChange}
          error={titleError}
        />

        <DebouncedInput
          label="Description"
          multiline
          name="description"
          value={description}
          onChange={this.onInputChange}
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

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem, deleteItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
