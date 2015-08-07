import React, { PropTypes } from 'react';

export default class Repos {
  static propTypes = {
    repos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.fetchRepo({username: 'donilan', repo: 'react-router-integration'});
  }

  render() {
    let { repos } = this.props;
    console.log(repos);
    return <h1>Hello github</h1>;
  }
}
