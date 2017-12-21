import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import { requiredValidation, emailValidation } from '../../../forms/validation';
import { renderInputReactstrap } from '../../../forms/helpers';
import { FORM_EMAIL_RECOVERY_CODE } from '../../../constants/index';

const SendCodeForRecoverPasswordForm = ({
  handleSubmit,
  submitting,
  pristine
}) =>
  <form onSubmit={handleSubmit}>
    <Field
      name={'email'}
      component={renderInputReactstrap}
      label={'Account Email'}
      validate={[requiredValidation, emailValidation]}
    />
    <Button
      block
      type={'submit'}
      disabled={pristine || submitting}
      color="primary"
      className="px-4"
    >
      Send me a recovery code
    </Button>
  </form>;

SendCodeForRecoverPasswordForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  pristine: PropTypes.bool, // added by redux-form
  valid: PropTypes.bool, // added by redux-form
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submitting: PropTypes.bool // added by redux-form
};

export default reduxForm({
  form: FORM_EMAIL_RECOVERY_CODE
})(SendCodeForRecoverPasswordForm);
