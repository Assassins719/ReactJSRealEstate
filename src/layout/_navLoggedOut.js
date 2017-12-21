import {
  LOGIN_PATH,
  RECOVER_PASSWORD_PATH,
  SIGNUP_PATH
} from '../constants/index';

export default {
  items: [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'Sign Up',
      url: SIGNUP_PATH,
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Login',
      url: LOGIN_PATH,
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Recover',
      url: RECOVER_PASSWORD_PATH
    }
  ]
};
