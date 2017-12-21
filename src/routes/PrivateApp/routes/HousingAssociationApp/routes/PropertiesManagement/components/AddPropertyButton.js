import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { push } from 'react-router-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { newPropertyDraftData } from '../../../../../../../schemas/propertySchemas';

/**
 * When clicked,
 * pushes an id to /users/authUid/haUserProperties
 * pushes with the same ID to to /properties/
 * pushes with status = draft
 * dispatches action to redirect to /app/properties/ID
 * this route grabs the data and sets as initialValues
 */
class AddPropertyButton extends React.PureComponent {
  render() {
    const { firebase, dispatch, authUid } = this.props;
    const handleAddingProperty = () => {
      // https://firebase.google.com/docs/database/web/read-and-write
      const newPropertyKey = firebase.push('/properties/').key;
      const updates = {
        [`/properties/${newPropertyKey}`]: newPropertyDraftData,
        [`/users/${authUid}/haUserProperties/${newPropertyKey}`]: true
      };
      // Both set() and update() can return a Promise you can use to know when the write is
      // committed to the database.
      return firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          // dispatch should come from props which comes from connect
          // redirect to /app/properties/ID
          dispatch(push(`/app/properties/${newPropertyKey}`));
          // same as
          // this.props.history.push(`/app/properties/${newPropertyKey}`);
        })
        .catch(err => console.error(err));
    };
    return (
      <Button onClick={handleAddingProperty}>
        Add Property
      </Button>
    );
  }
}

AddPropertyButton.propTypes = {
  firebase: PropTypes.object,
  authUid: PropTypes.string
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth: { uid } } }) => ({
    authUid: uid
  }))
)(AddPropertyButton);
