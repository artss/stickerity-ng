import PropTypes from 'prop-types';

export const userType = {
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  salt: PropTypes.string,
  masterPasswordAdded: PropTypes.bool,
  masterPasswordError: PropTypes.bool,
  authPending: PropTypes.bool,
  authError: PropTypes.string,
};
