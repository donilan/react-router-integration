import React, { PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory'
import { reduxRouteComponent } from 'redux-react-router';
import { store } from './index.js';
import * as components from './components'

export default class AppRouter {
  render() {
    return(
      <Router history={new HashHistory()}>
        <Redirect from="/" to="/github" />
        {/* TODO Warning: owner-based and parent-based contexts differ (values: `[object Object]` vs `[object Object]`) for key (store) while mounting Connector (see: http://fb.me/react-context-by-parent) */}
        <Route component={reduxRouteComponent(store)}>
          <Route component={components.pages.GithubIndex} path='/github'>
            <Route component={components.pages.GithubRepo} path='/:username/:repo' />
            <Route component={components.pages.GithubUser} path='/:username' />
          </Route>
        </Route>
      </Router>
    )
  }
}
