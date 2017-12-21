import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import Loading from '../components/Loading';

const userIsNotAuthenticatedDefaults = {
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth && auth.isLoaded && !auth.isEmpty,
  authenticatingSelector: ({ firebase: { auth } }) =>
    auth === undefined || !auth.isLoaded,
  wrapperDisplayName: 'UserIsNotAuthenticated'
};

export const userIsNotAuthenticated = connectedAuthWrapper(
  userIsNotAuthenticatedDefaults
);

/**
 * @description Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-helpers-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const userIsNotAuthenticatedRedirect = connectedRouterRedirect({
  ...userIsNotAuthenticatedDefaults,
  AuthenticatingComponent: Loading,
  redirectPath: '/login'
});
