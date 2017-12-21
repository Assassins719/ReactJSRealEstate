import React from 'react';
import { Alert } from 'reactstrap';
import { APP_SUPPORT_EMAIL } from '../../../../../../constants/index';

export default function VerifiedAccount() {
  return (
    <Alert color="info">
      <p>
        Your account is verified. You are able to use the full functionality of
        the site.
      </p>
      <p>
        Any questions? Need help with something? Feel free to contact {APP_SUPPORT_EMAIL}.
      </p>
    </Alert>
  );
}
