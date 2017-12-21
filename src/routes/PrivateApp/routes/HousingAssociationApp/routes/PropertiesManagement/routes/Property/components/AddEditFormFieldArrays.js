import React from 'react';
import { Field } from 'redux-form';
import { Button } from 'reactstrap';
import { renderInputReactstrap } from '../../../../../../../../../forms/helpers';

const styles = {
  noListStyle: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    marginBottom: 10
  }
};

export const renderKeyFacts = ({ fields, meta: { error, submitFailed } }) =>
  <ul style={styles.noListStyle}>
    <li>
      <Button type="button" onClick={() => fields.push({})}>
        Add Key-Facts
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((keyFact, index) =>
      <li key={Math.random()}>
        <Field
          name={`${keyFact}.name`}
          type="text"
          component={renderInputReactstrap}
          label={`Key Fact ${index + 1}`}
        />
        <Button type="button" onClick={() => fields.remove(index)}>
          Remove Key-fact
        </Button>
      </li>
    )}
  </ul>;

export const renderFeatures = ({ fields, meta: { error, submitFailed } }) =>
  <ul style={styles.noListStyle}>
    <li>
      <Button type="button" onClick={() => fields.push({})}>
        Add Feature
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((feature, index) =>
      <li key={Math.random()}>
        <Field
          name={`${feature}.name`}
          type="text"
          component={renderInputReactstrap}
          label={`Feature ${index + 1}`}
        />
        <Button type="button" onClick={() => fields.remove(index)}>
          Remove Feature
        </Button>
      </li>
    )}
  </ul>;

export const renderOthers = ({ fields, meta: { error, submitFailed } }) =>
  <ul style={styles.noListStyle}>
    <li>
      <Button type="button" onClick={() => fields.push({})}>
        Add Other
      </Button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((other, index) =>
      <li key={Math.random()}>
        <Field
          name={`${other}.name`}
          type="text"
          component={renderInputReactstrap}
          label={`Other ${index + 1}`}
        />
        <Button type="button" onClick={() => fields.remove(index)}>
          Remove Other
        </Button>
      </li>
    )}
  </ul>;
