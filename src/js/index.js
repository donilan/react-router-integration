import React from 'react';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { routerStateReducer } from 'redux-react-router';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import DiffMonitor from 'redux-devtools-diff-monitor';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import * as stores from './stores';
import AppRouter from './router';
import init from './init';

const reducer = combineReducers({
  router: routerStateReducer,
  ...stores,
});
console.log(__DEV__);
const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

export const store = finalCreateStore(reducer, {});

React.render(
  <div>
    <Provider store={store}>
      {() => <AppRouter />}
    </Provider>
    { __DEV__ && (
      <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
     )}
  </div>
  , document.getElementById('root'));
