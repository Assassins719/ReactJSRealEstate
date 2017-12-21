import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import { ACCOUNT_FORM_NAME } from '../../../../../../constants/index';
import { renderInputReactstrap } from '../../../../../../forms/helpers';

const AccountForm = ({ account, handleSubmit, pristine, submitting }) =>
  <form onSubmit={handleSubmit}>
    <h5>Account Settings</h5>
    <Field
      name="displayName"
      label={'Full Name'}
      component={renderInputReactstrap}
      type={'text'}
    />
    <Field
      name="email"
      label={'Email'}
      component={renderInputReactstrap}
      type={'text'}
    />
    <Button type={'submit'} disabled={pristine || submitting} color="success">
      Update Settings
    </Button>
  </form>;

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: ACCOUNT_FORM_NAME
})(AccountForm);
