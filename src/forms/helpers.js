/**
 * Redux Formis a powerful library that makes aspects of building forms for the web a lot simpler by utilising the power of redux.
 *
 * Watch Eric, the creator of Redux Form, talk about it: https://www.youtube.com/watch?v=6C22gwvOzaw
 * Tutorial: https://www.youtube.com/watch?v=6C22gwvOzaw
 *
 * Redux Form allows the use of Field Renderers to wrap form fields. In the Redux Form examples, Material UI is used to show this off https://redux-form.com/7.0.4/examples/material-ui/
 *
 * Since we use Bootstrap, we use the Reactstrap components to build our form's Field Renderers
 */
import React from 'react';
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  FormFeedback
} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Default renderer, doesn't use Reactstrap, shown for example
 * @param input
 * @param label
 * @param type
 * @param touched
 * @param error
 * @param warning
 */
export const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error &&
          <span>
            {error}
          </span>) ||
          (warning &&
            <span>
              {warning}
            </span>))}
    </div>
  </div>;

// Read this first:
// https://github.com/erikras/redux-form/issues/2733
/**
 * Use PropTypes, this is a general input, but should be split later to handle different types of input fields
 */
export class renderInputReactstrap extends React.PureComponent {
  render() {
    const {
      icon,
      input,
      label,
      placeholder,
      type,
      meta: { touched, error, warning }
    } = this.props;

    // https://www.npmjs.com/package/classnames
    const classes = classNames({
      success: touched && !error,
      danger: touched && error
    });

    const userInput = icon
      ? <InputGroup className="mb-3">
          <InputGroupAddon><i className={icon} /></InputGroupAddon>
          <Input
            {...input}
            type={type}
            placeholder={placeholder}
            // state={classes}
          />
        </InputGroup>
      : <Input
          {...input}
          type={type}
          placeholder={placeholder}
          // state={classes}
        />;

    return (
      <FormGroup
      // color={classes}
      >
        {label ? <Label>{label}</Label> : null}
        {userInput}
        {touched && error && <FormFeedback>{error}</FormFeedback>}
        {touched && warning && <FormFeedback>{warning}</FormFeedback>}
      </FormGroup>
    );
  }
}

renderInputReactstrap.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.any
  }),
  icon: PropTypes.string
};

export const renderHousingSelector = ({ input, meta: { touched, error } }) =>
  <div>
    <select {...input}>
      <option>Select a Housing Option...</option>
      {[
        { name: 'Supported Housing' },
        { name: 'Sheltered Housing' },
        { name: 'Care Home' },
        { name: 'Retirement Home' },
        { name: 'Youth Hostel' },
        { name: 'Temporary Accomodation' },
        { name: 'PSL' },
        { name: 'Other' }
      ].map(housingOption =>
        <option value={housingOption.name} key={Math.random()}>
          {housingOption.name}
        </option>
      )}
    </select>
    {touched && error && <span> {error} </span>}
  </div>;

export const renderCheckbox = ({ input, label, type }) =>
  <div>
    <FormGroup check>
      <Label check>
        <Input type={type} {...input} />
        {label}
      </Label>
    </FormGroup>
  </div>;
