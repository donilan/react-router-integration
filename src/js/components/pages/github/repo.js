import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  repo: state.github.repo
}))
export default class GithubRepo extends React.Component {
  static propTypes = {
    repo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.fetchRepo({
      username: this.props.params.username,
      repo: this.props.params.repo
    });
  }

  render() {
    let { repo } = this.props;
    if (repo === undefined) {
      return <div>Loading...</div>;
    }
    return (
      <div className="well">
        <a href={repo.url} target="_blank" className="btn btn-primary">View this project</a>
      </div>
    );
  }

}
