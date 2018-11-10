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
    registered: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const {
      email,
      token,
      registered,
      activate: act,
    } = this.props;

    if (registered) {
      return;
    }

    act(email, token);
  }

  render() {
    const { user: { authPending, authError }, registered } = this.props;

    return (
      <Sticker
        className={s.root}
        title="Account activation"
      >
        {registered
          ? (
            <div>
              We sent the activation link to your e-mail.<br />
              Please, activate your account within 24 hours.
            </div>
          )
          : (
            <div>
              {authPending && 'Activating...'}

              {authError && (
                <div className={s.error}>
                  {authError}
                </div>
              )}
            </div>
          )
        }
      </Sticker>
    );
  }
}

function mapStateToProps({ user }, { location: { search, state = { registered: false } } }) {
  const { email = '', token = '' } = qs.parse(search.replace(/^\?/, ''));
  return {
    user,
    email,
    token,
    registered: state.registered,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ activate }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthPage));
