import React, { Component } from 'react';
import { Alert, Button } from 'reactstrap'
import { connect } from 'react-redux';
import {APP_BRAND_NAME } from '../../../../../../constants/index';
import { sendVerificationEmail } from "../../../../../../actions/user";

class NotVerified extends Component {
  handleVerificationEmailSending = () => {
    this.props.sendVerificationEmail();
  };

  render() {
    return (
      <Alert color="danger" >
        <p>
          <strong>
            To use {APP_BRAND_NAME}'s functionality, we need you to verify your
            email.
          </strong>
        </p>
        <p>
          An email should have been sent to your inbox when you signed up
          (double check your
          spam!), but if not you can request another one by clicking this
          button:
        </p>
        <p>Please refresh the page if you've clicked on the link.</p>
        <Button onClick={this.handleVerificationEmailSending}>
          Send Verification Email
        </Button>
      </Alert>
    );
  }
}

export default connect(null, { sendVerificationEmail })(NotVerified);
