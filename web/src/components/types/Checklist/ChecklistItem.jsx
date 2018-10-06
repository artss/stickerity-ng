import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'react-toolbox/lib/checkbox';

export default class ChecklistItem extends Component {
  static propTypes = {
    $listId: PropTypes.string.isRequired,
    $id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    updateItem: PropTypes.func,
  };

  static defaultProps = {
    updateItem() {},
  };

  toggleCheck = () => {
    const {
      $listId,
      $id,
      checked,
      updateItem,
    } = this.props;

    updateItem($listId, $id, { checked: !checked });
  };

  render() {
    const { text } = this.props;
    const { checked } = this.props;

    return (
      <li>
        <Checkbox
          checked={checked}
          label={text}
          onChange={this.toggleCheck}
        />
      </li>
    );
  }
}
