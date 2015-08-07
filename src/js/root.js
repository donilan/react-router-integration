import React, { Component, PropTypes } from 'react'
import { Redirect, Router, Route } from 'react-router'
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as reducers from './reducers';
import * as containers from './containers'


const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

export default class Root extends Component {
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

function renderRoutes(history) {
  return (
    <Router history={history}>
      <Route component={containers.GithubUser} path='/'>
        <Route component={containers.GithubRepo} path='/repo'>
        </Route>
      </Route>
    </Router>
  )
}
