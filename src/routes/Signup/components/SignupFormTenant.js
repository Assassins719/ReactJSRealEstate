import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import {
  requiredValidation,
  emailValidation,
  minLength
} from '../../../forms/validation';
import { renderInputReactstrap } from '../../../forms/helpers';

// https://github.com/erikras/redux-form/issues/1270
// https://github.com/erikras/redux-form/issues/2733
const SignupFormTenant = ({ pristine, submitting, handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        name={'email'}
        component={renderInputReactstrap}
        placeholder={'Enter your email address'}
        icon={'icon-user'}
        type={'email'}
        validate={[requiredValidation, emailValidation]}
      />
    </div>
    <div>
      <Field
        name={'password'}
        component={renderInputReactstrap}
        placeholder={'Enter your password'}
        icon={'icon-lock'}
        type={'password'}
        validate={[requiredValidation, minLength(6)]}
      />

    </div>
    <Button
      type={'submit'}
      disabled={pristine || submitting}
      color="success"
      block
    >
      Create Tenant Account
    </Button>
  </form>;

SignupFormTenant.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
};

export default reduxForm({
  form: 'signupTenant'
})(SignupFormTenant);
