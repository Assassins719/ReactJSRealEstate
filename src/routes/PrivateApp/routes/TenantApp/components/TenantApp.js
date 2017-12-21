import React from 'react';
import { Route, Switch } from 'react-router-dom';
import T_Dashboard from '../routes/Dashboard';
import PropertySearch from '../../AnyUser/PropertySearch';
import {
  USER_APP_SEARCH_PROPERTIES_PATH
} from '../../../../../constants/index';
import { userIsNotVerifiedRedirect } from '../../../../../auth-helpers/userIsNotVerified';

// under props.match.path should be equal to '/app'
const TenantApp = props =>
  <Switch>
    {/* At the moment a working example of IKEA search */}
    {/* <Route */}
      {/* exact */}
      {/* path={`${props.match.path}${USER_APP_SEARCH_PATH}`} */}
      {/* component={Search} */}
    {/* /> */}

    {/* Comes from /AnyUser/ */}
    <Route
      path={`${props.match.path}${USER_APP_SEARCH_PROPERTIES_PATH}`}
      component={PropertySearch}
    />
    <Route exact component={userIsNotVerifiedRedirect(T_Dashboard)} />
  </Switch>;

export default TenantApp;
