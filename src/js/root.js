import React, { PropTypes } from 'react'
import { Redirect, Router, Route } from 'react-router'
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import * as stores from './stores';
import * as components from './components'


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

function renderRoutes(history) {
  return (
    <Router history={history}>
      <Route component={components.pages.GithubIndex} path='/github'>
        <Route component={components.pages.GithubRepo} path='/:username/:repo' />
        <Route component={components.pages.GithubUser} path='/:username' />
      </Route>
    </Router>
  )
}
