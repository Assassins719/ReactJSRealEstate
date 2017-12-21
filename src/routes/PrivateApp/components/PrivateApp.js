import React from 'react';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import { ACCOUNT_PATH, USER_APP_PATH } from '../../../constants/index';
import Account from '../routes/AnyUser/Account';
import TenantApp from '../routes/TenantApp';
import HousingAssociationApp from '../routes/HousingAssociationApp';
import { userIsNotVerifiedRedirect } from '../../../auth-helpers/userIsNotVerified';
import { housingProviderIsNotVerifiedRedirect } from '../../../auth-helpers/housingProviderIsNotVerified';


// https://mjrussell.github.io/redux-auth-wrapper/docs/Getting-Started/NestingWrappers.html#chaining-using-compose
const userIsNotHousingProviderRedirect = compose(
  userIsNotVerifiedRedirect,
  housingProviderIsNotVerifiedRedirect
);

class PrivateApp extends React.PureComponent {
  render() {
    if (!isLoaded(this.props.housingProvider)) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {/* Make sure the conditional logic is inside the Route's component prop  */}
        {/* https://mjrussell.github.io/redux-auth-wrapper/docs/Getting-Started/Overview.html#not-safe-to-apply */}
        {/* Redirect any type of user to /account if not verified */}
        {/* Switch the component based on the users role */}
        <Route
          path={USER_APP_PATH}
          component={
            this.props.housingProvider
              ? userIsNotHousingProviderRedirect(HousingAssociationApp)
              : userIsNotVerifiedRedirect(TenantApp)
          }
        />
        {/* We don't need to protect the Account route,
        as any route that isn't specified in TopLevelRoutes redirects to /login,
        and PrivateApp is protected by the auth HOC
        */}
        <Route exact path={ACCOUNT_PATH} component={Account} />
      </div>
    );
  }
}

export default connect(({ firebase: { profile: { housingProvider } } }) => ({
  housingProvider
}))(PrivateApp);
