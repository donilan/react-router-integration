var React = require("react");
var Router = require('react-router');
var Layout = require('./layouts/default')
var RouteHandler = Router.RouteHandler;

var App = React.createClass({

  render: function () {
    return (
      <Layout>
        <RouteHandler/>
      </Layout>
    );
  }
});

module.exports = App;
