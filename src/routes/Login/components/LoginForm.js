import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-grecaptcha';
import captchaKey from '../../../config/captchaKey';
import {
  requiredValidation,
  emailValidation,
  minLength
} from '../../../forms/validation';
import { renderInputReactstrap } from '../../../forms/helpers';
import { RECOVER_PASSWORD_PATH} from "../../../constants/index";
var isRobot = true;
const verifyCallback = response => {isRobot = false;}
const expiredCallback = () => isRobot = true;

const LoginForm = ({ pristine, submitting, handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        name={'email'}
        component={renderInputReactstrap}
        placeholder={'Email'}
        type={'email'}
        icon={'icon-user'}
        validate={[requiredValidation, emailValidation]}
      />
    </div>
    <div>
      <Field
        icon={'icon-lock'}
        name={'password'}
        component={renderInputReactstrap}
        placeholder={'Password'}
        type={'password'}
        validate={[requiredValidation, minLength(6)]}
      />
      <Recaptcha
        sitekey= {captchaKey.siteKey}
        callback={verifyCallback}
        expiredCallback={expiredCallback}
        />
        <br/>
    </div>


    <Row>
      <Col xs="6">
        <Button
          type={'submit'}
          disabled={pristine || submitting}
          color="primary"
          className="px-4"
        >
          Login
        </Button>
      </Col>
      <Col xs="6" className="text-right">
        <Link to={RECOVER_PASSWORD_PATH}>
          <Button color="link" className="px-0">
            Forgot password?
          </Button>
        </Link>
      </Col>
    </Row>
  </form>;

LoginForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
};

export default reduxForm({
  form: 'login'
})(LoginForm);
