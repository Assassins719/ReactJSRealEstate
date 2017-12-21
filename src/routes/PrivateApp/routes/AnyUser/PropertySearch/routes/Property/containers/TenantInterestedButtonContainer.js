import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class TenantInterestedButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInterestButtonDisabled: false,
      notInterestedAnymoreButtonDisabled: false
    };
  }

  /**
   * @description The Finder stops becoming interested in a Property
   */
  handleStopInterestButtonClicked() {
    // Disable Button
    this.setState({
      notInterestedAnymoreButtonDisabled: true
    });

    // Set locations to null
    const { firebase, authUid, propertyId } = this.props;
    const updates = {
      [`/propertiesFindersAreInterestedIn/${propertyId}/${authUid}`]: null,
      [`/users/${authUid}/propertiesInterestedIn/${propertyId}`]: null
    };
    // Both set() and update() can return a Promise you can use to know when the write is
    // committed to the database.
    return firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // dispatch should come from props which comes from connect
        this.setState({
          notInterestedAnymoreButtonDisabled: false
        });
      })
      .catch(err => console.error(err));
  }

  /**
   * @description The Finder shows interest in a Property
   */
  handleShowInterestButtonClicked() {
    // Disable Button
    this.setState({
      showInterestButtonDisabled: true
    });

    const {
      firebase,
      authUid,
      propertyId,
      housingFindersEmail
    } = this.props;
    const updates = {
      [`/propertiesFindersAreInterestedIn/${propertyId}/${authUid}`]: {
        email: housingFindersEmail
      },
      [`/users/${authUid}/propertiesInterestedIn/${propertyId}`]: true
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
        // same as
        // this.props.history.push(`/app/properties/${newPropertyKey}`);
        console.log('set to firebase');
        this.setState({
          showInterestButtonDisabled: false
        });
      })
      .catch(err => console.error(err));
  }
  //

  render() {
    const {
      showInterestButtonDisabled,
      notInterestedAnymoreButtonDisabled
    } = this.state;
    const { housingProvider, isUserInterestedInProperty } = this.props;

    /**
     * @findersOnly
     */
    if (housingProvider) return null;

    // Finders Only
    // If Finder is already interested in a Property,
    // give them to option to stop being interested
    if (isUserInterestedInProperty) {
      return (
        <Button
          onClick={() => this.handleStopInterestButtonClicked()}
          disabled={notInterestedAnymoreButtonDisabled}
          color="warning"
        >
          Not Interested Anymore
        </Button>
      );
    }
    // Since they're not already interested, we can show them a
    // "I'm interested button:
    return (
      <Button
        onClick={() => this.handleShowInterestButtonClicked()}
        disabled={showInterestButtonDisabled}
        color="primary"
      >
        I'm Interested
      </Button>
    );
  }
}

TenantInterestedButtonContainer.propTypes = {
  housingProvider: PropTypes.bool, // rrf
  authUid: PropTypes.string, // rrf
  isUserInterestedInProperty: PropTypes.bool, // rrf, can be true, false or null
  propertyId: PropTypes.string // comes from parent component
};
export default compose(
  firebaseConnect((props, firebase) => {
    const { propertyId } = props;
    const { _: { authUid } } = firebase;
    const isUserInterestedInPropertyRef = `/users/${authUid}/propertiesInterestedIn/${propertyId}`;
    return [
      {
        storeAs: 'isUserInterestedInProperty',
        path: `${isUserInterestedInPropertyRef}`
      }
    ];
  }),
  connect(
    ({
      firebase: {
        auth: { uid },
        profile: { housingProvider },
        profile: { email },
        data: { isUserInterestedInProperty }
      }
    }) => ({
      authUid: uid,
      housingFindersEmail: email,
      isUserInterestedInProperty,
      housingProvider
    })
  )
)(TenantInterestedButtonContainer);

// Grab email
