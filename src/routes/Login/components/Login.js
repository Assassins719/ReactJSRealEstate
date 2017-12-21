import React from 'react';

import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBlock,
  Button,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import LoginForm from './LoginForm';
import { APP_BRAND_NAME } from '../../../constants/index';
export default function Login(props) {
  const showAuthError = () => {
    if (isLoaded(props.authError) && !isEmpty(props.authError)) {
      return (
        <Alert color={'danger'}>
          {props.authError.message}
        </Alert>
      );
    }
    return null;
  };
  return (
    <div className={'app flex-row align-items-center'}>
      <Container>
        <Row className={'justify-content-center'}>
          <Col md={'8'}>
            <CardGroup className="mb-0">
              <Card className="p-4">
                <CardBlock className="card-body">
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <LoginForm onSubmit={props.handleLogin} />
                  {showAuthError()}
                </CardBlock>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none">
                <CardBlock className="card-body text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      You need to be signed up to {APP_BRAND_NAME} to utilise the
                      benefits. Not signed up?
                    </p>
                    <Link to={'/signup'}>
                      <Button className="mt-3">
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBlock>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
