import React from 'react';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { success } from 'react-notification-system-redux';
import { Button } from 'reactstrap';
import { H_propertyDeleted } from '../../../../../../../constants/notifications';

/**
 * @description
 * When clicked,
 * uses the propertyKey prop passed to it
 * and deletes the property under /properties/
 * and the reference under users/authUid/haUserProperties
 * in Firebase
 */
class DeletePropertyButton extends React.PureComponent {
  render() {
    const { firebase, dispatch, authUid, propertyKey } = this.props;
    const handleDeletingProperty = () => {
      /*
      The simplest way to delete data is to call remove()
      on a reference to the location of that data.
      You can also delete by specifying null as the value
      for another write operation such as set() or update().
      You can use this technique with update() to delete multiple children in a single API call.
      We use this technique below
      */
      const updates = {
        [`/properties/${propertyKey}`]: null,
        [`/users/${authUid}/haUserProperties/${propertyKey}`]: null
      };
      // Both set() and update() can return a Promise you can use to know when the write is
      // committed to the database.
      return firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          // dispatch should come from props which comes from connect
          dispatch(success(H_propertyDeleted));
          this.props.history.push(`/app/properties/`);
        })
        .catch(err => console.error(err));
    };
    return (
      <Button onClick={handleDeletingProperty}>
        Delete
      </Button>
    );
  }
}

DeletePropertyButton.propTypes = {
  firebase: PropTypes.object,
  authUid: PropTypes.string,
  propertyKey: PropTypes.string
};

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth: { uid } } }) => ({
    authUid: uid
  }))
)(DeletePropertyButton);
