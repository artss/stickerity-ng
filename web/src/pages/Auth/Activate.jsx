import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import qs from 'qs';

import { userType } from '../../proptypes/user';
import { activate } from '../../actions/user';
import Sticker from '../../components/Sticker';

import s from './AuthPage.css';

class AuthPage extends PureComponent {
  static propTypes = {
    user: PropTypes.shape(userType).isRequired,
    email: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    activate: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { email, token, activate: act } = this.props;
    act(email, token);
  }

  render() {
    const { user: { authPending, authError } } = this.props;

    return (
      <Sticker
        className={s.root}
        title="Account activation"
      >
        {authPending && 'Activating...'}

        {authError && (
          <div className={s.error}>
            {authError}
          </div>
        )}
      </Sticker>
    );
  }
}

function mapStateToProps({ user }, { location: { search } }) {
  const { email, token } = qs.parse(search.replace(/^\?/, ''));
  return { user, email, token };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ activate }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthPage));
