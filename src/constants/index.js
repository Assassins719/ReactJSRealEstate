export const APP_BRAND_NAME = 'HomePointr Development';
export const APP_SUPPORT_EMAIL = 'henry@henrymoulton.com';

export const LOGIN_PATH = '/login';
export const SIGNUP_PATH = '/signup';
export const RECOVER_PASSWORD_PATH = '/recover-password';

export const ACCOUNT_PATH = '/account';
export const USER_APP_PATH = '/app';
export const USER_APP_SEARCH_PATH = '/search';
export const USER_APP_PROPERTIES_PATH = '/properties';
export const USER_APP_SEARCH_PROPERTIES_PATH = '/search-properties';
export const USER_APP_PROPERTY_PATH = '/:propertyId';
export const USER_APP_PROPERTY_ID_PATH = '/:propertyId';

export const ACCOUNT_FORM_NAME = 'account';
export const LOGIN_FORM_NAME = 'login';
export const SIGNUP_FORM_NAME = 'signup';
export const FORM_EMAIL_RECOVERY_CODE = 'enterEmailToSendRecoveryCode';
export const FORM_RECOVER_PASSWORD_USING_CODE = 'enterEmailToSendRecoveryCode';
export const MESSAGES_PATH = '/messages';
export const formNames = {
  account: ACCOUNT_FORM_NAME,
  signup: SIGNUP_FORM_NAME,
  login: LOGIN_FORM_NAME,
};

export const paths = {
  account: ACCOUNT_PATH,
  login: LOGIN_PATH,
  signup: SIGNUP_PATH,
  messages:MESSAGES_PATH
};

export const misc = {
  appName: APP_BRAND_NAME
};

export default { ...paths, ...formNames, ...misc };
