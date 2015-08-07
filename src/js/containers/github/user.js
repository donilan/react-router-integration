import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'react-redux';
import * as Actions from '../../actions/github';
import User from '../../components/github/user';

export default class UserContainer extends Component {

  render() {
    return (
      <Connector select={state => ({user: state})}>
        {this.renderChild}
      </Connector>
    );
  }

  renderChild({ user, dispatch }) {
    const actions = bindActionCreators(Actions, dispatch);
    return <User user={user} actions={actions} />
  }
}
