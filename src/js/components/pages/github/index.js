import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import * as githubActions from '../../../actions/github';
import { connect } from 'react-redux'

@connect(state => ({
  github: state.github
}))
export default class GithubIndex extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleClick() {
    var username = this.refs.username.getDOMNode().value.trim();
    this.context.router.transitionTo(`/github/${username}`)
    /* this.props.actions.fetchUser({username: username}); */
  }

  handleInputKeyUp(e) {
    if(e.keyCode === 13) {
      this.handleClick();
    }
  }

  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(githubActions, dispatch);
    var params = [];
    this.props.params.username && params.push(this.props.params.username);
    this.props.params.repo && params.push(this.props.params.repo);
    return (
      <div className="container">
        <div className="header">
          <h1>Github viewer</h1>
          <h2>Please entry your user name</h2>
        </div>
        <div className="content">
          <div className="input-group">
            <input ref="username" className="form-control" type="text"
            defaultValue={params.join('/')} onKeyUp={this.handleInputKeyUp.bind(this)}/>
            <span className="input-group-btn">
              <button className="btn btn-primary"
                onClick={this.handleClick.bind(this)}>Go</button>
            </span>
          </div>
          <div className="col-xs-4">
            {this.props.children &&
             React.cloneElement(this.props.children, { actions, ...this.props })}
          </div>
        </div>
      </div>
    );
  }
}
