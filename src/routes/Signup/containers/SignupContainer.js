import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import {
  signupTenant,
  signupTenantWithFacebook,
  signupHousingAssociation
} from '../../../actions/user';
import Signup from '../components/Signup';

class SignupContainer extends Component {
  handleSignup = creds => this.props.signupTenant(creds);

  handleFacebookSignup = () => this.props.signupTenantWithFacebook();

  handleHousingAssociationSignup = creds => {
    this.props.signupHousingAssociation(creds);
  };

  render() {
    const { authError } = this.props;

    return (
      <Signup
        handleHousingAssociationSignup={this.handleHousingAssociationSignup}
        handleFacebookSignup={this.handleFacebookSignup}
        handleSignup={this.handleSignup}
        authError={authError}
      />
    );
  }
}

SignupContainer.propTypes = {
  authError: PropTypes.shape({
    message: PropTypes.string
  })
};

const wrappedSignupContainer = firebaseConnect()(SignupContainer);

export default connect(
  ({ firebase: { authError, auth, profile } }) => ({
    authError,
    auth,
    profile
  }),
  { signupTenant, signupTenantWithFacebook, signupHousingAssociation }
)(wrappedSignupContainer);
