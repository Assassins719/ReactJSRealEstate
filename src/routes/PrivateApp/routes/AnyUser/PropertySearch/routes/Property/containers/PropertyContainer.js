import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Property from '../components/Property';

export default compose(
  firebaseConnect(props => {
    const { match: { params: { propertyId } } } = props;
    const propertyRef = `/properties/${propertyId}/`;
    return [{ type: 'once', path: `${propertyRef}` }];
  }),
  connect(
    ({ firebase: { data: { properties } } }, { match: { params: { propertyId } } }) => {
      if (properties === undefined || propertyId === undefined) {
        return {};
      }
      return {
        property: properties[propertyId],
        propertyId
      };
    }
  )
)(Property);
