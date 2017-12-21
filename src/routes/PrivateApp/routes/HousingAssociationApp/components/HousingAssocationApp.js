import React from 'react';
import { Route, Switch } from 'react-router-dom';
import hDashboard from '../routes/Dashboard';
import {
  USER_APP_PROPERTIES_PATH,
  USER_APP_SEARCH_PROPERTIES_PATH
} from '../../../../../constants/index';
import H_PropertyContainer from '../routes/PropertiesManagement/routes/Property/containers/H_PropertyContainer';
import H_PropertiesContainer from '../routes/PropertiesManagement/containers/H_PropertiesContainer';
import PropertySearch from '../../AnyUser/PropertySearch';

// under props.match.path should be equal to '/app'
const HousingAssociationApp = props =>
  <Switch>
    <Route
      exact
      path={`${props.match.path}${USER_APP_PROPERTIES_PATH}`}
      component={H_PropertiesContainer}
    />
    <Route
      path={`${props.match.path}${USER_APP_PROPERTIES_PATH}/:id`}
      component={H_PropertyContainer}
    />
    {/* Comes from /AnyUser/ */}
    <Route
      path={`${props.match.path}${USER_APP_SEARCH_PROPERTIES_PATH}`}
      component={PropertySearch}
    />
    <Route exact path={`/app`} component={hDashboard} />
  </Switch>;

export default HousingAssociationApp;
