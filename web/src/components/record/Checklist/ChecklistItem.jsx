import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'react-toolbox/lib/checkbox';

export default class NoteItem extends PureComponent {
  static propTypes = {
    // $listId: PropTypes.string.isRequired,
    // $id: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  };

  constructor({ checked }) {
    super();
    this.state = { checked };
  }

  // TODO: action
  toggleCheck = () => {
    this.setState(({ checked }) => ({ checked: !checked }));
  };

  render() {
    const { text } = this.props;
    const { checked } = this.state;

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
