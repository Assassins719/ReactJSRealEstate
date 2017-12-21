import React, { Component } from 'react';
import RecoverPassword from '../components/RecoverPassword';
import { sendRecoveryEmailToUser, setNewPasswordUsingRecoveryCode } from '../../../actions/user';
import { connect } from 'react-redux';

class RecoverPasswordContainer extends Component {
  handleSendRecoveryEmail = ({ email }) =>
    this.props.sendRecoveryEmailToUser(email);

  handleSetNewPasswordUsingRecoveryCode = ({ code, password }) =>
    this.props.setNewPasswordUsingRecoveryCode(code, password);

  render() {
    return (
      <RecoverPassword
        sendRecoverEmail={this.handleSendRecoveryEmail}
        setNewPasswordWithRecoveryCode={this.handleSetNewPasswordUsingRecoveryCode}
      />
    );
  }
}

export default connect(null, { sendRecoveryEmailToUser, setNewPasswordUsingRecoveryCode })(RecoverPasswordContainer);
