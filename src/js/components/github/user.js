import React, { PropTypes } from 'react';

export default class User {
  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  handleClick() {
    var username = this.refs.username.getDOMNode().value.trim();
    this.props.actions.fetchUser({username: username});
  }

  render() {
    let { user } = this.props;
    return (
      <div className="container">
        <div className="header">
          <h1>Github viewer</h1>
          <h2>Please entry your user name</h2>
        </div>
        <div className="content">
          <div className="input-group">
            <input ref="username" className="form-control" type="text" />
            <span className="input-group-btn">
              <button className="btn btn-primary"
                onClick={this.handleClick.bind(this)}>Go</button>
            </span>
          </div>
          <p className="col-xs-4 col-xs-offset-2">
            {user}
          </p>
        </div>
      </div>
    );
  }
}
