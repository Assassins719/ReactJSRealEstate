import React from 'react';
import { Alert, Container, Button, Row, Col } from 'reactstrap';
import AccountForm from './AccountForm';
import NotVerified from './NotVerified';
import VerifiedAccount from './VerifiedAccount';
import {
  APP_BRAND_NAME,
  APP_SUPPORT_EMAIL
} from '../../../../../../constants/index';
import H_StripeSubscribeContainer from '../containers/H_StripeSubscribeContainer';

export default function Account({
  adminVerifiedHousingProvider,
  auth,
  housingProvider,
  initialValues,
  logOut,
  onSubmit
}) {
  const housingProviderStatus = () => {
    if (housingProvider === null) {
      return null;
    } else if (housingProvider === true) {
      return <span>Housing Provider</span>;
    } else {
      return <span>Tenant</span>;
    }
  };

  const verifiedHousingProviderStatus = () => {
    if (adminVerifiedHousingProvider === null) {
      return null;
    } else if (
      adminVerifiedHousingProvider === true &&
      housingProvider === true
    ) {
      return (
        <Alert color="success">
          You've been verified by an administrator as a Housing Provider
        </Alert>
      );
    } else if (
      adminVerifiedHousingProvider === false &&
      housingProvider === true
    ) {
      return (
        <div>
          <Alert color="warning">
            <p>
              <strong>
                To use {APP_BRAND_NAME}'s <strong>Housing Association</strong>
                {' '}functionality, you need to
                {' '}<strong>subscribe to a payments plan</strong> and be
                manually verified by an
                administrator.
              </strong>
            </p>
            <p>
              This should be done within 24 hours after subscribing. If it's
              been
              longer than 24 hours, send us an email: {' '}
              {APP_SUPPORT_EMAIL}.
            </p>
          </Alert>

        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="mt-4">
      <Container>
        <Row>
          <Col>
            <h3 style={{ marginBottom: '16px' }}>Your Account</h3>
            <h5>Account Type: {housingProviderStatus()}</h5>
            <Button onClick={() => logOut()}>Logout</Button>
            <div style={{ height: '16px' }} />
          </Col>
        </Row>
        <Row>
          <Col>
            {auth.emailVerified ? <VerifiedAccount /> : <NotVerified />}
            {verifiedHousingProviderStatus()}
            <H_StripeSubscribeContainer />
          </Col>
          <Col>
            <AccountForm onSubmit={onSubmit} initialValues={initialValues} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
