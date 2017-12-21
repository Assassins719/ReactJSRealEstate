import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import LoggedInMenu from './LoggedInMenu';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH } from '../constants';
import { APP_BRAND_NAME } from '../constants/index';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isNavbarOpen: false
    };
  }

  toggle() {
    this.setState({
      isNavbarOpen: !this.state.isNavbarOpen
    });
  }

  render() {
    const { account, auth } = this.props;
    const authExists = isLoaded(auth) && !isEmpty(auth);

    const notLoggedInMenu = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Link to={SIGNUP_PATH}><NavLink>Signup</NavLink></Link>
        </NavItem>
        <NavItem>
          <Link to={LOGIN_PATH}>
            <NavLink>
              Login
            </NavLink>
          </Link>
        </NavItem>
      </Nav>
    );

    const rhsMenu = authExists ? <LoggedInMenu /> : notLoggedInMenu;

    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <Link to={authExists ? ACCOUNT_PATH : '/'}>
            <NavbarBrand>{APP_BRAND_NAME}</NavbarBrand>
          </Link>
          <Collapse isOpen={this.state.isNavbarOpen} navbar>
            {rhsMenu}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const wrappedAppNavbar = firebaseConnect()(AppNavbar);
export default connect(({ firebase: { auth, account } }) => ({
  auth,
  account
}))(wrappedAppNavbar);
