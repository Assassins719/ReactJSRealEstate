import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import {
  renderHousingSelector,
  renderInputReactstrap,
  renderCheckbox
} from '../../../../../../../../../forms/helpers';
import {
  renderKeyFacts,
  renderFeatures,
  renderOthers
} from './AddEditFormFieldArrays';

let AddEditPropertyForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h3>Property Info</h3>
      {/* Status: Live or Draft */}
      <div style={{ margin: '20px' }}>
        <Field
          name={'liveOnApp'}
          id={'liveOnApp'}
          component={renderCheckbox}
          label={' Display on App'}
          type={'checkbox'}
        />
      </div>

      {/* Address Line 1, Address Line 2, Town/City, PostCode */}
      <div>
        <h3>Address</h3>
        <Field
          name={'addressLine1'}
          component={renderInputReactstrap}
          label={'Address Line 1'}
          placeholder={'Craig Street'}
          type={'text'}
          // validate={[requiredValidation]}
        />

        <Field
          name={'addressLine2'}
          component={renderInputReactstrap}
          label={'Address Line 2'}
          placeholder={'Address Line 2'}
          type={'text'}
        />

        <Field
          name={'cityOrTown'}
          component={renderInputReactstrap}
          label={'City or Town'}
          placeholder={'Edinburgh'}
          type={'text'}
        />

        <Field
          name={'postCode'}
          component={renderInputReactstrap}
          label={'Postcode'}
          placeholder={'EH6 5JJ'}
          type={'text'}
        />
      </div>

      {/* landlordName: 'Bield Housing & Care', */}
      <Field
        name={'landlordName'}
        component={renderInputReactstrap}
        label={'Landlords Name'}
        placeholder={'Bield Housing & Care'}
        type={'text'}
        // validate={[requiredValidation]}
      />

      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Field
          name={'lettingType'}
          component={renderHousingSelector}
          type={'select'}
          // validate={[requiredValidation]}
        />
      </div>

      <div>
        {/* TODO: Add images do this later */}
      </div>

      <div>
        <h3>Charges</h3>
        {/* charges: { */}
        {/* rent: '£297.33 Monthly', */}
        {/* energyAndHeating: '£27.59 monthly', */}
        {/* tenancyAndService: '£142.76 monthly', */}
        {/* total: '£467.68 Monthly (not including and future charges' */}
        {/* }, */}
        <h5>Key Facts</h5>
        <FieldArray name="keyFacts" component={renderKeyFacts} />
      </div>

      <div>
        {/* features: {} */}
        <h5>Features</h5>
        <FieldArray name="features" component={renderFeatures} />
      </div>

      <div>
        {/* other: [ */}
        {/* '1 bedroom flat, 1st floor (no lift available)', */}
        {/* 'Wet Floor Show' */}
        {/* ], */}
        <h5>Others</h5>
        <FieldArray name="others" component={renderOthers} />
      </div>

      {/* yourNearest */}
      <h3>Your Nearest</h3>
      {/* transportLinks: Bus stop (0.1 miles) */}
      <Field
        name={'transportLinks'}
        component={renderInputReactstrap}
        label={'Transport Links'}
        placeholder={'Bus stop (0.1 miles)'}
        type={'text'}
        // validate={[requiredValidation]}
      />
      {/* education: 'Primary school (0.1 miles), Secondary school (0.3 miles)', */}
      <Field
        name={'schools'}
        component={renderInputReactstrap}
        label={'Schools'}
        placeholder={'Primary school (0.1 miles), Secondary school (0.3 miles)'}
        type={'text'}
        // validate={[requiredValidation]}
      />
      {/* pubsBarsRestaurants: */}
      <Field
        name={'pubsBarsRestaurants'}
        component={renderInputReactstrap}
        label={'Pubs, Bars and Restaurants'}
        placeholder={
          'Hen voluntary Service (0.5 miles), Colny Fish (0.5 miles)'
        }
        type={'text'}
        // validate={[requiredValidation]}
      />
      <h3>Map Data</h3>
      {/* mapData: { */}
      {/* long: 'longitude', */}
      {/* lat: 'latitude' */}
      {/* } */}
      <Field
        name={'long'}
        label={'Longitude'}
        placeholder={'Longitude'}
        component={renderInputReactstrap}
        type={'text'}
      />
      <Field
        name={'lat'}
        label={'Latitude'}
        placeholder={'Latitude'}
        component={renderInputReactstrap}
        type={'text'}
      />

      {/* landlordInformation: {} */}
      <Field
        name={'landlordInformation'}
        label={'Landlord Information'}
        placeholder={'Any additional information'}
        component={renderInputReactstrap}
        type={'text'}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

AddEditPropertyForm = reduxForm({
  // a unique name for the form
  form: 'addEditPropertyForm'
})(AddEditPropertyForm);

export default AddEditPropertyForm;
