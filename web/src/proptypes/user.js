import PropTypes from 'prop-types';

export const userType = {
  id: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
  salt: PropTypes.string,
  masterPasswordAdded: PropTypes.bool,
  masterPasswordError: PropTypes.bool,
};
