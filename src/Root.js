import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import history from './config/history';

// Since Provider wraps ConnectedRouter, our Router (that's not connected: https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux#usage) will use the store from Provider automatically
const Root = ({ store }) =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>;

export default Root;
