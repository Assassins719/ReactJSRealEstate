import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { success } from 'react-notification-system-redux';
import H_Property from '../components/H_Property';
import { H_propertyUpdated } from '../../../../../../../../../constants/notifications';

class H_PropertyContainer extends React.PureComponent {
  render() {
    const { firebase, dispatch } = this.props;
    const handleSubmit = values => {
      const propertyKey = this.props.match.params.id;
      const updates = {
        [`/properties/${propertyKey}`]: values
      };
      // Both set() and update() can return a Promise you can use to know when the write is
      // committed to the database.
      return firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          dispatch(success(H_propertyUpdated));
        })
        .catch(err => console.error(err));
    };
    return (
      <H_Property
        handleSubmit={handleSubmit}
        initialValues={this.props.property}
        propertyKey={this.props.match.params.id}
      />
    );
  }
}

H_PropertyContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  property: PropTypes.object,
  firebase: PropTypes.object
};

export default compose(
  firebaseConnect(props => {
    const { match: { params: { id } } } = props;
    // const uid = firebase._.authUid;
    const propertyRef = `/properties/${id}/`;
    return [{ type: 'once', path: `${propertyRef}` }];
  }),
  connect(
    ({ firebase: { data: { properties } } }, { match: { params: { id } } }) => {
      if (properties === undefined || id === undefined) {
        return {};
      }
      return {
        property: properties[id],
        propertyId: id
      };
    }
  )
)(H_PropertyContainer);
