import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dialog from 'react-toolbox/lib/dialog';

import s from './DeleteDialogButton.css';

export default class DeleteDialogButton extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    action: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    className: null,
    children: null,
  };

  state = {
    showDialog: false,
  };

  actions = [
    {
      label: 'No, thanks',
      onClick: () => {
        this.setState({ showDialog: false });
      },
    },

    {
      label: 'Yes, please',
      onClick: () => {
        const { action } = this.props;
        action();
      },
    },
  ];

  handleToggle = () => {
    this.setState(({ showDialog }) => ({ showDialog: !showDialog }));
  }

  render() {
    const { title, className, children } = this.props;
    const { showDialog } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <Fragment>
        <span className={cx(s.deleteButton, className)} onClick={this.handleToggle}>
          {children}
        </span>

        <Dialog
          actions={this.actions}
          active={showDialog}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title="Confirm deletion"
        >
          <p>
            Do you really want to delete <b>{title}</b>?
          </p>
        </Dialog>
      </Fragment>
    );
  }
}
