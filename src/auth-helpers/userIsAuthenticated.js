import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import { USER_APP_PATH } from '../constants/index';

const userIsAuthenticatedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth && auth.isLoaded && auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  wrapperDisplayName: 'UserIsAuthenticated',
  predicate: ({ firebase: { auth } }) => auth.isEmpty
};

export const userIsAuthenticated = connectedAuthWrapper(
  userIsAuthenticatedDefaults
);

export const userIsAuthenticatedRedirect = connectedRouterRedirect({
  ...userIsAuthenticatedDefaults,
  redirectPath: USER_APP_PATH,
  allowRedirectBack: false,
  failureRedirectPath: '/'
});
