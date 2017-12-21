import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

const housingProviderIsNotVerifiedDefaults = {
  // Want to redirect the user when they are done loading and authenticated
  authenticatedSelector: ({ firebase: { profile } }) =>
    profile &&
    profile.adminVerifiedHousingProvider,
  authenticatingSelector: ({ firebase: { isInitializing } }) =>
    isInitializing === true,
  wrapperDisplayName: 'HousingProviderIsNotVerified',
  predicate: ({ firebase: { profile } }) =>
    profile.adminVerifiedHousingProvider
};

export const housingProviderIsNotVerified = connectedAuthWrapper(
  housingProviderIsNotVerifiedDefaults
);

export const housingProviderIsNotVerifiedRedirect = connectedRouterRedirect({
  ...housingProviderIsNotVerifiedDefaults,
  redirectPath: '/account',
  allowRedirectBack: false,
  failureRedirectPath: '/'
});
