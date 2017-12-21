import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderInputReactstrap } from '../../../../../../forms/helpers';
import { requiredValidation } from '../../../../../../forms/validation';

/**
 * @description
 *
  number: newCreditCard.number,
  cvc: newCreditCard.cvc,
  exp_month: newCreditCard.exp_month,
  exp_year: newCreditCard.exp_year,
  address_zip: newCreditCard.address_zip
},
 */
const CheckoutForm = ({ pristine, submitting, handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        name={'number'}
        component={renderInputReactstrap}
        label={'Enter your Credit Card Number'}
        placeholder={'4222 3333 5555 7777'}
        icon={'icon-user'}
        type={'text'}
        validate={[requiredValidation]}
      />
    </div>
    <div>
      <Field
        name={'cvc'}
        component={renderInputReactstrap}
        label={'Enter your 3 digit CVC number'}
        placeholder={'123'}
        icon={'icon-user'}
        type={'text'}
        validate={[requiredValidation]}
      />
    </div>
    <div style={{ display: 'inline-block', maxWidth: '300px' }}>
      <Field
        name={'exp_month'}
        component={renderInputReactstrap}
        label={'Enter the Card Expiry Month'}
        placeholder={'10'}
        icon={'icon-user'}
        type={'text'}
        validate={[requiredValidation]}
      />
      <Field
        name={'exp_year'}
        component={renderInputReactstrap}
        label={'Expiry Year'}
        placeholder={'2022'}
        icon={'icon-user'}
        type={'text'}
        validate={[requiredValidation]}
      />
    </div>
    <div>
      <Field
        name={'address_zip'}
        component={renderInputReactstrap}
        placeholder={'Enter the Billing Postcode of the Card'}
        icon={'icon-user'}
        type={'text'}
        validate={[requiredValidation]}
      />
    </div>
    <button type="submit">Submit</button>
  </form>;

CheckoutForm.propTypes = {
  pristine: PropTypes.bool.isRequired, // added by redux-form
  submitting: PropTypes.bool.isRequired, // added by redux-form
  handleSubmit: PropTypes.func.isRequired // added by redux-form
};

export default reduxForm({
  // a unique name for the form
  form: 'stripeHASubscribe'
})(CheckoutForm);
