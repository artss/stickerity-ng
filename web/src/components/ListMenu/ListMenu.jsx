import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';

import { navigate } from '../../util/history';

import s from './ListMenu.css';

export default class ListMenu extends PureComponent {
  static propTypes = {
    $id: PropTypes.string.isRequired,
  };

  onEdit = () => {
    const { $id } = this.props;
    navigate(`/lists/${$id}/edit`);
  }

  render() {
    return (
      <IconMenu theme={s} className={s.root} icon="more_vert" menuRipple>
        <MenuItem
          icon="edit"
          theme={s}
          caption="List settings"
          onClick={this.onEdit}
        />
        <MenuItem value="delete" icon="delete" caption="Delete list" />
      </IconMenu>
    );
  }
}
