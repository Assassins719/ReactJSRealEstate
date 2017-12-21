import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { loginUser } from "../../../actions/user";
import Login from "../components/Login";

class LoginContainer extends Component {
  handleLogin = loginData => {
    this.props.loginUser(loginData)
  };

  render() {
    const { authError } = this.props;
    return (
        <div>
          <Login
              handleLogin={this.handleLogin}
              authError={authError}
          />
        </div>
    );
  }
}

LoginContainer.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  authError: PropTypes.shape({
    message: PropTypes.string
  })
};

const wrappedLoginContainer = firebaseConnect()(LoginContainer);

// MapStateToProps
export default connect(({ firebase: { authError } }) => ({
  authError
}), { loginUser })(wrappedLoginContainer);
