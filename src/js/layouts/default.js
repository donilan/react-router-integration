var React = require('react/addons');
var Router = require('react-router');

var {Navbar, Nav, NavItem, Grid, Row, Col} = require('react-bootstrap');
var {NavItemLink} = require('react-router-bootstrap');

var { CSSTransitionGroup } = React.addons;
var cloneElement = React.cloneElement;

var Link = Router.Link;

var DefaultLayout = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render: function() {
    var name = this.context.router.getCurrentPath();
    return (
      <div>
        <Navbar brand="II2d Office" inverse toggleNavKey={0} fluid={true}
          className="navbar-fixed-top" >
          <Nav eventKey={0}>
            <NavItemLink eventKey={1} to="dashboard">Dashboard</NavItemLink>
          </Nav>
        </Navbar>
        <Grid fluid={true}>
          <Row>
            <Col sm={12} md={12} className="main" >
            <CSSTransitionGroup component="div" transitionName="example">
              {cloneElement(this.props.children || <div/>, {key: name})}
            </CSSTransitionGroup>
                        </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

module.exports = DefaultLayout;
