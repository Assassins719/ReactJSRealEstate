import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  CardHeader
} from 'reactstrap';
import EmailForm from './SendCodeForRecoverPasswordForm';
import RecoverForm from './RecoverPasswordForm';

export default function RecoverPassword({
  sendRecoverEmail,
  setNewPasswordWithRecoveryCode
}) {
  return (
    <div style={{ marginTop: '30px' }}>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md={'6'}>
            <Card>
              <CardHeader>Account Password Recovery</CardHeader>
              <CardBlock>
                <strong>
                  Step 1: Enter your account email and we'll send you a code.
                </strong>
                <EmailForm onSubmit={sendRecoverEmail} />
              </CardBlock>
              <CardBlock>
                <strong>
                  Step 2: Enter the code we sent to your email here:
                </strong>
                <RecoverForm onSubmit={setNewPasswordWithRecoveryCode} />
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
