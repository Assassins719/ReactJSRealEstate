import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  CardFooter,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import SignupFormTenant from './SignupFormTenant';
import SignupFormHousingAssociation from './SignupFormHousingAssociation';
import Recaptcha from 'react-grecaptcha';
import captchaKey from '../../../config/captchaKey';
var isRobot = true;
const verifyCallback = response => { isRobot = false; }
const expiredCallback = () => isRobot = true;
export default function Signup({
  authError,
  handleSignup,
  handleFacebookSignup,
  handleHousingAssociationSignup
}) {
  const showAuthError = () => {
    if (isLoaded(authError) && !isEmpty(authError)) {
      return (
        <div>
          <p>{authError.message}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="app flex-row align-items-center">
      <Container fluid>
        <Col xs="12" sm="12" style={{ textAlign: 'center' }}>
          <h4>Please prove you are not a robot!</h4>
        </Col>
        <Row className="justify-content-center" style={{ margin: '20px' }}>
          <Recaptcha
            sitekey={captchaKey.siteKey}
            callback={verifyCallback}
            expiredCallback={expiredCallback}
          />
        </Row>
        <Row className="justify-content-center">
          <Col>
            <Card style={{ minWidth: '30vw' }}>
              <CardBlock className="card-body p-4">
                <h1>Signup as a Tenant</h1>
                <p>
                  Already have an account? <Link to={'/login'}>Login</Link>
                </p>
                <p className="text-muted">Create your account</p>
                <SignupFormTenant onSubmit={handleSignup} />
                {showAuthError()}
              </CardBlock>
              <CardFooter className="p-4">
                <Row>
                  <Col xs="12" sm="12">
                    <Button
                      onClick={() => handleFacebookSignup()}
                      className="btn-facebook"
                      block
                    >
                      <span>Sign Up With Facebook</span>
                    </Button>
                    {showAuthError()}
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>

          <Col>
            <Card style={{ minWidth: '30vw' }}>
              <CardBlock className="card-body p-4">
                <h1>Signup as a Housing Provider</h1>
                <p>
                  Already have an account? <Link to={'/login'}>Login</Link>
                </p>
                <p className="text-muted">
                  Create your account, you will need to be manually approved to
                  use the site as a Housing Provider.
                </p>
                <SignupFormHousingAssociation
                  onSubmit={handleHousingAssociationSignup}
                />
                {showAuthError()}
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
