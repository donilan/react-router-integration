var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Project name</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><Link to="dashboard">Dashboard</Link></li>
                <li><Link to="settings">Settings</Link></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Help</a></li>
              </ul>
              <form className="navbar-form navbar-right">
                <input type="text" className="form-control" placeholder="Search..." />
              </form>
            </div>
          </div>
        </nav>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = DefaultLayout;
