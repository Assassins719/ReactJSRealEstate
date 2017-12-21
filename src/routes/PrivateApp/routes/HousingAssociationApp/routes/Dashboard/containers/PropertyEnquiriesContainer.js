import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  firebaseConnect,
  populate
} from 'react-redux-firebase';
import PropertyEnquiries from '../components/PropertyEnquiries';

class PropertyEnquiriesContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userPropertiesThatHaveInterest: null
    };
  }

  componentDidMount() {
    // should have haUserProperties key
    //  populated with Names, should have user keys populated with emails
    const { firebase, populatedUser: { haUserProperties } } = this.props;
    const propertiesRef = firebase.ref('/properties');

    // Map over the keys and create an array of promises
    if(Promise == null)
    {return null}
    Promise.all(
      Object.keys(haUserProperties).map(propertyKey => {
        // Two things:
        // 1. Query on the property Key to get the property name
        // setup ref
        const propertyNameRef = propertiesRef
          .child(`${propertyKey}`)
          .child('landlordName');

        return propertyNameRef
          .once('value')
          .then(snap => ({
            name: snap.val(),
            // Convert emails to array alonside the name of the property
            userEmails: Object.keys(haUserProperties[propertyKey]).map(
              userKey => haUserProperties[propertyKey][userKey].email
            )
          }))
          .catch(err => console.error(err));
      })
    )
      .then(arr => // all the promises resolve and are in the correct format
        this.setState({
          userPropertiesThatHaveInterest: arr
        })
      )
      .catch(err => console.error(err));
  }

  render() {
    const { userPropertiesThatHaveInterest } = this.state;
    if (!userPropertiesThatHaveInterest) {
      return <div>Loading...</div>;
    }
    return (
      <PropertyEnquiries
        userPropertiesThatHaveInterest={userPropertiesThatHaveInterest}
      />
    );
  }
}

PropertyEnquiriesContainer.propTypes = {
  haUserProperties: PropTypes.object
};

// http://react-redux-firebase.com/docs/recipes/populate.html

export default compose(
  firebaseConnect(),
  connect(({ firebase }) => ({
    populatedUser: populate(firebase, 'profile', [
      { child: 'haUserProperties', root: 'propertiesFindersAreInterestedIn' }
    ])
  }))
)(PropertyEnquiriesContainer);
