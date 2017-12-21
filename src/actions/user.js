import * as firebase from 'firebase';
import { success, error } from 'react-notification-system-redux';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import rrfConfig from '../config/rrf';
import {
  signupSuccessNotif,
  userRecoveryEmailSent,
  verifyEmailSentSuccess
} from '../constants/notifications';
import {
  FORM_RECOVER_PASSWORD_USING_CODE,
  FORM_EMAIL_RECOVERY_CODE
} from '../constants/index';

export const loginUser = loginFormData => (dispatch, getState, getFirebase) => {
  dispatch({
    type: 'LOGGING_IN_USER'
  });
  const firebaseRrf = getFirebase();
  const { login } = firebaseRrf;
  login(loginFormData);
};

export const signupTenant = signupFormData => (
  dispatch,
  getState,
  getFirebase
) => {
  const firebaseRrf = getFirebase();
  const { createUser } = firebaseRrf;

  createUser(signupFormData, {
    email: signupFormData.email
  })
    .then(() => {
      dispatch(success(signupSuccessNotif));
      // https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
      // react-redux-firebase doens't have verification email sending yet,
      // just the pure firebase library
      const loggedInUser = firebase.auth().currentUser;
      loggedInUser
        .sendEmailVerification()
        .then(() => {
          //  Redirect to /account using react-router-redux
          // Since we're logged in after signup, and the route is protected,
          // we should be redirected to /account
          // Therefore we don't have to dispatch an action to change the url, otherwise we would:
          // dispatch(push('/account'));
          const { update, _: { authUid } } = firebaseRrf;
          dispatch({
            type: 'SET_USER_TENANT'
          });
          update(`${rrfConfig.userProfile}/${authUid}`, {
            email: signupFormData.email,
            housingProvider: false
          });
        })
        .catch(e => console.log('Error with email verification sending:', e));
    })
    .catch(e => console.error(e));
};

/**
 * Logging in with Facebook gives us access to the users name and email,
 * due to the hard requirement of this PrivateApp needing users to have a
 * verified email address, after logging in we use the email that Facebook has given us to send them a verification email.
 */
export const signupTenantWithFacebook = () => (
  dispatch,
  getState,
  getFirebase
) => {
  const firebaseRrf = getFirebase();
  firebaseRrf
    .login({ provider: 'facebook' })
    .then(() => {
      // Don't need to redirect, auth-helpers handle it
      const loggedInUser = firebase.auth().currentUser;
      loggedInUser
        .sendEmailVerification()
        .then(() => {
          //  Redirect to /account using react-router-redux
          // Since we're logged in after signup, and the route is protected,
          // we should be redirected to /app
          // Therefore we don't have to dispatch an action to change the url, otherwise we would:
          // dispatch(push('/account'));
          const { update, _: { authUid } } = firebaseRrf;
          dispatch({
            type: 'SET_USER_TENANT'
          });
          // TODO: check where the email of the user is stored when logging in with Facebook
          update(`${rrfConfig.userProfile}/${authUid}`, {
            housingProvider: false
          });
        })
        .catch(e => console.log('Error with email verification sending:', e));
      dispatch(success(signupSuccessNotif));
    })
    .catch(err => {
      console.log('there was an error', err);
    });
};

export const signupHousingAssociation = signupFormData => (
  dispatch,
  getState,
  getFirebase
) => {
  const firebaseRrf = getFirebase();
  const { createUser } = firebaseRrf;
  createUser(signupFormData, {
    email: signupFormData.email
  })
    .then(() => {
      dispatch(success(signupSuccessNotif));
      // https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email
      // react-redux-firebase doens't have verification email sending yet,
      // just the pure firebase library
      const loggedInUser = firebase.auth().currentUser;
      loggedInUser
        .sendEmailVerification()
        .then(() => {
          //  Redirect to /account using react-router-redux
          // Since we're logged in after signup, and the route is protected,
          // we should be redirected to /app
          // Therefore we don't have to dispatch an action to change the url, otherwise we would:
          // dispatch(push('/account'));

          console.log('loggedInUser', loggedInUser);
          // Need to user the users auth uid
          const { update, _: { authUid } } = firebaseRrf;
          dispatch({
            type: 'SET_USER_HOUSING_ASSOCIATION'
          });
          update(`${rrfConfig.userProfile}/${authUid}`, {
            email: signupFormData.email,
            housingProvider: true,
            adminVerifiedHousingProvider: false
          });
        })
        .catch(e => console.log('Error with email verification sending:', e));
    })
    .catch(e => console.error(e));
};

export const sendRecoveryEmailToUser = email => (
  dispatch,
  getState,
  getFirebase
) => {
  const firebaseRrf = getFirebase();
  dispatch({
    type: 'SENDING_RECOVERY_EMAIL'
  });
  dispatch(reset(FORM_RECOVER_PASSWORD_USING_CODE)); // https://redux-form.com/7.1.1/docs/faq/howtoclear.md/
  firebaseRrf
    .resetPassword(email)
    .then(() => {
      dispatch(success(userRecoveryEmailSent));
    })
    .catch(err => {
      dispatch(error(userRecoveryEmailSent));
      return Promise.reject(err);
    });
};

export const setNewPasswordUsingRecoveryCode = (code, password) => (
  dispatch,
  getState,
  getFirebase
) => {
  const firebaseRrf = getFirebase();
  const { verifyPasswordResetCode, confirmPasswordReset } = firebaseRrf;
  return verifyPasswordResetCode(code)
    .then(() => {
      dispatch(reset(FORM_EMAIL_RECOVERY_CODE)); // https://redux-form.com/7.1.1/docs/faq/howtoclear.md/
      confirmPasswordReset(code, password);
    })
    .then(() => console.log('Password changed successfully'))
    .catch(err => {
      console.error('Error updating account', err);
      return Promise.reject(err);
    });
};

export const updateUserAccountSettings = accountFormData => (
  dispatch,
  getState,
  getFirebase
) => {
  const firebaseRrf = getFirebase();
  console.log(firebaseRrf);
  const { update, _: { authUid } } = firebaseRrf;
  dispatch({
    type: 'UPDATE_USER_ACCOUNT_SETTINGS'
  });
  update(`${rrfConfig.userProfile}/${authUid}`, accountFormData);
};

export const logOut = () => (dispatch, getState, getFirebase) => {
  const firebaseRrf = getFirebase();
  dispatch(push('/'));
  firebaseRrf.logout();
};

export const sendVerificationEmail = () => dispatch => {
  const loggedInUser = firebase.auth().currentUser;
  loggedInUser
    .sendEmailVerification()
    .then(() => {
      dispatch(success(verifyEmailSentSuccess));
    })
    .catch(e => console.log('Error with email verification sending:', e));
};
