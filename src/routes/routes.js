// Needs to align closely to _nav.js
// This dependency isn't ideal, but for demos sake hacky
// Used by PageTitle and Breadcrumb

import {
  ACCOUNT_PATH,
  APP_BRAND_NAME,
  LOGIN_PATH,
  RECOVER_PASSWORD_PATH,
  SIGNUP_PATH,
  USER_APP_PATH,
  MESSAGES_PATH,
} from '../constants/index';

const routes = {
  '/': APP_BRAND_NAME,
  [USER_APP_PATH]: 'HomePointr',
  [LOGIN_PATH]: 'Login',
  [SIGNUP_PATH]: 'Signup',
  [RECOVER_PASSWORD_PATH]: 'Recover',
  [ACCOUNT_PATH]: 'Your Account',
  [MESSAGES_PATH]: 'Messages',
};
export default routes;
