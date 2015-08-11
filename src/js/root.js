import React, { PropTypes } from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as stores from './stores';
import renderRoutes from './router';
import init from './init';

const reducer = combineReducers(stores);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    const { history } = this.props
    return (
      <Provider store={store}>
        {renderRoutes.bind(null, history)}
      </Provider>
    )
  }
}
