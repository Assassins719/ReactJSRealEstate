import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

const userIsNotVerifiedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth && auth.isLoaded && auth.emailVerified,
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) =>
    !auth.isLoaded || isInitializing === true,
  wrapperDisplayName: 'UserIsNotVerified',
  predicate: ({ firebase: { auth } }) => auth.emailVerified
};

export const userIsNotVerified = connectedAuthWrapper(
  userIsNotVerifiedDefaults
);

export const userIsNotVerifiedRedirect = connectedRouterRedirect({
  ...userIsNotVerifiedDefaults,
  redirectPath: '/account',
  allowRedirectBack: false,
  failureRedirectPath: '/'
});
