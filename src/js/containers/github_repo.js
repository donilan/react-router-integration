import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import * as Actions from '../actions/github';
import Repos from '../components/github/repos';

export default class GithubRepo extends Component {

  render() {
    return (
      <Connector select={state => ({repos: state.github_repos})}>
        {this.renderChild}
      </Connector>
    );
  }

  renderChild({ repos, dispatch }) {
    const actions = bindActionCreators(Actions, dispatch);
    return <Repos repos={repos} actions={actions} />
  }
}
