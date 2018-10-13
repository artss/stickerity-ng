import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import Checkbox from 'react-toolbox/lib/checkbox';

import { eventType } from '../../../proptypes/event';
import { updateItem } from '../../../actions/lists';

// import s from './EventPage.css';

class EventPage extends PureComponent {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    updateItem: PropTypes.func.isRequired,
    ...eventType,
  };

  onInputChange = (value, ev) => {
    const { name } = ev.target;
    const { $listId, $id, updateItem: update } = this.props;
    update($listId, $id, { [name]: value });
  };

  onDateChange = () => {
  };

  static getTitle({ title, description }) {
    return title || description.substr(0, 16);
  }

  render() {
    const {
      // $listId,
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

    return (
      <div>
        <Input
          label="Title"
          name="title"
          value={title}
          onChange={this.onInputChange}
        />

        <Input
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
        />

        <Checkbox
          label="Annual"
          name="annual"
          checked={annual}
          onChange={this.onInputChange}
        />

        <Checkbox
          label="Whole day"
          name="wholeDay"
          checked={wholeDay}
          onChange={this.onInputChange}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);