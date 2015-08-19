var React = require("react");
var {RouteHandler} = require('react-router');
var Layout = require('./layouts/default');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../../node_modules/font-awesome/css/font-awesome.css');
require('../sass/app.scss');

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
