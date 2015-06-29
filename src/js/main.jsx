var jQuery = require('jquery');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var App = require('./app');
var Dashboard = require('./pages/dashboard');

var Settings = require('./pages/settings');

var routes = (
  <Route name="app" handler={App} path="/" >
    <DefaultRoute name="dashboard" handler={Dashboard} />
    <Route name="settings" handler={Settings} />
  </Route>
);

jQuery(function(){
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
