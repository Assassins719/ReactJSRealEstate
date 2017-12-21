import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Messages from './Messages';
import PrivateApp from './PrivateApp';
import RecoverPassword from './RecoverPassword';
import { userIsNotAuthenticatedRedirect } from '../auth-helpers/userIsNotAuthenticated';
import { userIsAuthenticatedRedirect } from '../auth-helpers/userIsAuthenticated';
import {
  LOGIN_PATH,
  RECOVER_PASSWORD_PATH,
  SIGNUP_PATH,
  MESSAGES_PATH
} from '../constants/index';

const TopLevelRoutes = () =>
  <Switch>
    <Route exact path={'/'} component={userIsAuthenticatedRedirect(Home)} />
    <Route
      exact
      path={SIGNUP_PATH}
      component={userIsAuthenticatedRedirect(Signup)}
    />
    <Route
      exact
      path={LOGIN_PATH}
      component={userIsAuthenticatedRedirect(Login)}
    />
    <Route
      exact
      path={MESSAGES_PATH}
      component={userIsAuthenticatedRedirect(Messages)}
    />
    <Route exact path={RECOVER_PASSWORD_PATH} component={RecoverPassword} />
    <Route component={userIsNotAuthenticatedRedirect(PrivateApp)} />
  </Switch>;

export default TopLevelRoutes;
