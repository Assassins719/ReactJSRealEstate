import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { routerMiddleware } from 'react-router-redux';
// import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from './reducers/index';
import fbConfig from '../config/fire';
import rrfConfig from '../config/rrf';
import history from '../config/history';

const configureStore = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Build the middleware for intercepting and dispatching navigation actions
  // Now you can dispatch navigation actions from anywhere!
  // store.dispatch(push('/foo'))
  const reactRouterReduxMiddleware = routerMiddleware(history);

  const createStoreWithFirebase = compose(
    reactReduxFirebase(fbConfig, rrfConfig)
  )(createStore);

  const store = createStoreWithFirebase(
    reducers,
    composeEnhancers(
      applyMiddleware(
        thunk.withExtraArgument(getFirebase),
        reactRouterReduxMiddleware
      )
      // https://github.com/rt2zz/redux-persist#about-auto-rehydrate
      // autoRehydrate()
    )
  );

  // begin periodically persisting the store with a transform for the immutable state
  // persistStore(store);

  return store;
};
export default configureStore;
