import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends PureComponent {
  static propTypes = {
    id: PropTypes.number,
  };

  static defaultProps = {
    id: null,
  };

  render() {
    const { id, component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => (
          id
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login' }} />
        )}
      />
    );
  }
}

function mapStateToProps({ user: { id } }) {
  return { id };
}

export default connect(mapStateToProps)(PrivateRoute);
