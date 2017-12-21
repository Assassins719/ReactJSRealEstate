import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import { reducer as notifications } from 'react-notification-system-redux';
import propertyReducer from './propertyReducer';

const rootReducer = combineReducers({
  property: propertyReducer,
  firebase: firebaseStateReducer,
  form: formReducer,
  router: routerReducer,
  notifications
});

export default rootReducer;
