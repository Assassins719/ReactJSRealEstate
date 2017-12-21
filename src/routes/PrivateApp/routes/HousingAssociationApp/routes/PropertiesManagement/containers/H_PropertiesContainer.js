import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import H_Properties from '../components/H_Properties';

class H_PropertiesContainer extends React.PureComponent {
  render() {
    return <H_Properties haUserProperties={this.props.haUserProperties} />;
  }
}

H_PropertiesContainer.propTypes = {
  haUserProperties: PropTypes.object
};

// export default compose(
//   //  Get the list of propertyids saved under the /users
//   // ,Use those ids to get the data of the properties from /properties
//   firebaseConnect((props, firebase) => {
//     const uid = firebase._.authUid;
//     const haUserPropertiesRef = `/users/${uid}/haUserProperties`;
//     return [
//       {
//         type: 'once',
//         path: `${haUserPropertiesRef}`,
//         storeAs: 'haUserProperties'
//       }
//     ];
//   }),
//   connect(({ firebase: { data: { haUserProperties }, auth: { uid } } }) => {
//     console.log('uid:', uid);
//     // Will be undefined if there's no userProperties
//     // const haUserProperties = data[uid].usersProperties;
//     // No properties added
//     if (haUserProperties === undefined || haUserProperties === null) {
//       return {};
//     }
//     return {
//       haUserProperties
//     };
//   })
// )(hPropertiesContainer);

// http://react-redux-firebase.com/docs/recipes/populate.html
const populates = [{ child: 'haUserProperties', root: 'properties' }];
export default compose(
  firebaseConnect((props, firebase) => {
    const uid = firebase.authUid;
    const HA_UserRef = `/users/${uid}`;
    return [{ path: HA_UserRef, populates }];
  }),
  connect(({ firebase }) => ({
    properties: firebase.data.properties,
    haUserProperties: populate(firebase, 'properties', populates)
  }))
)(H_PropertiesContainer);
