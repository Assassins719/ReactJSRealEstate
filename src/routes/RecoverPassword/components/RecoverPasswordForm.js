import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import { requiredValidation } from '../../../forms/validation';
import { renderInputReactstrap } from '../../../forms/helpers';
import { FORM_RECOVER_PASSWORD_USING_CODE } from '../../../constants/index';

const RecoverPasswordForm = ({ handleSubmit, submitting, pristine }) =>
  <form onSubmit={handleSubmit}>
    <Field
      name={'code'}
      component={renderInputReactstrap}
      label={'Recovery Code'}
      validate={[requiredValidation]}
    />
    <Field
      name={'newpassword'}
      type={'password'}
      component={renderInputReactstrap}
      label={'New Password'}
      validate={[requiredValidation]}
    />
    <Button
      block
      type={'submit'}
      disabled={pristine || submitting}
      color="primary"
      className="px-4"
    >
      Set New Password
    </Button>
  </form>;

RecoverPasswordForm.propTypes = {
  pristine: PropTypes.bool, // added by redux-form
  handleSubmit: PropTypes.func, // added by redux-form
  submitting: PropTypes.bool // added by redux-form
};

export default reduxForm({
  form: FORM_RECOVER_PASSWORD_USING_CODE
})(RecoverPasswordForm);
