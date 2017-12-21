import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { USER_APP_PROPERTY_ID_PATH } from '../../../../../../constants/index';

import PropertyContainer from '../routes/Property/containers/PropertyContainer';
import PropertiesSearchContainer from '../containers/PropertySearchContainer';

/**
 * @description
 * Protected to only be viewed by logged in, verified users,
 * PropertySearch is a
 * searchable,
 * filterable,
 * paginated,
 * master/detail View of that user's (tenants) are able to book.
 **/
const PropertySearch = props =>
  <Switch>

    {/* The Detail View */}
    <Route
      path={`${props.match.path}${USER_APP_PROPERTY_ID_PATH}`}
      component={PropertyContainer}
    />

    {/* The Main Algolia View */}
    <Route component={PropertiesSearchContainer} />
  </Switch>;

export default PropertySearch;
