import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.github.user
}))
export default class GithubUser extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.actions.fetchUser({username: this.props.params.username});
  }

  render() {
    let { user } = this.props;
    if (user === undefined) {
      return <div>Loading...</div>;
    }
    return (
      <div className="thumbnail">
        <img src={user.avatar_url} />
      </div>
    );
  }

}
