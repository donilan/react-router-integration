import React, { PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import * as components from './components'

export default function renderRoutes(history) {
  return (
    <Router history={history}>
      <Route component={components.pages.GithubIndex} path='/github'>
        <Route component={components.pages.GithubRepo} path='/:username/:repo' />
        <Route component={components.pages.GithubUser} path='/:username' />
      </Route>
      <Redirect from="/" to="/github" />
    </Router>
  )
}
