import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends PureComponent {
  static propTypes = {
    id: PropTypes.number,
    masterPasswordAdded: PropTypes.bool,
    masterPasswordError: PropTypes.bool,
  };

  static defaultProps = {
    id: null,
    masterPasswordAdded: false,
    masterPasswordError: false,
  };

  render() {
    const {
      id,
      masterPasswordAdded,
      masterPasswordError,
      component: Component,
      ...rest
    } = this.props;

    const render = (props) => {
      if (!id) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />;
      }

      if (!masterPasswordAdded || masterPasswordError) {
        return <Redirect to={{ pathname: '/master', state: { from: props.location.pathname } }} />;
      }

      return <Component {...props} />;
    };

    return <Route {...rest} render={render} />;
  }
}

function mapStateToProps({ user }) {
  return user;
}

export default connect(mapStateToProps)(PrivateRoute);
