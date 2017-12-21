// Needs to align closely to _nav.js
// This dependency isn't ideal, but for demos sake hacky
// Navitems on Desktop flip flop between left and right
import { USER_APP_PATH, USER_APP_PROPERTIES_PATH, USER_APP_SEARCH_PROPERTIES_PATH } from '../constants/index';

export default {

  housingProvider: {
    items: [
      {
        name: 'Home',
        url: USER_APP_PATH,
      },
      {
        name: 'Property Management',
        url: `${USER_APP_PATH}${USER_APP_PROPERTIES_PATH}`,
      },
      {
        name: 'Property Search',
        url: `${USER_APP_PATH}${USER_APP_SEARCH_PROPERTIES_PATH}`,
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
          text: 'NEW'
        }
      },
      {
        name: 'Account',
        url: '/account',
        icon: 'icon-speedometer'
      }
    ]
  },
  tenant: {
    items: [
      {
        name: 'Home',
        url: USER_APP_PATH,
      },
      {
        name: 'Account',
        url: '/account',
        icon: 'icon-speedometer'
      },
      {
        name: 'Property Search',
        url: `${USER_APP_PATH}${USER_APP_SEARCH_PROPERTIES_PATH}`,
        icon: 'icon-speedometer',
        badge: {
          variant: 'info',
          text: 'NEW'
        }
      },
    ]
  }
};
