import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Nav, NavItem } from 'reactstrap';
import defaultUserImage from '../static/User.png';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import {ACCOUNT_PATH, USER_APP_SEARCH_PATH} from '../constants/index';

class LoggedInMenu extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleLogout = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  };

  render() {
    const { profile, auth } = this.props;

    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              <img
                src={
                  profile && profile.avatarUrl
                    ? profile.avatarUrl
                    : defaultUserImage
                }
                alt="User's profile pic"
                width={32}
                height={32}
              />
              <span>
                {auth && auth.displayName
                  ? auth.displayName
                  : auth && auth.email ? auth.email : 'User'}
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Account</DropdownItem>
              <DropdownItem>
                {' '}<Link to={ACCOUNT_PATH}>Settings</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem header>Me</DropdownItem>
              <DropdownItem>
                {' '}<Link to={USER_APP_SEARCH_PATH}>Search</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.handleLogout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      </Nav>
    );
  }
}

LoggedInMenu.propTypes = {
  firebase: PropTypes.shape({
    auth: PropTypes.func.isRequired,
    profile: PropTypes.object
  }),
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

const wrappedLoggedInMenu = withRouter(firebaseConnect()(LoggedInMenu));

// MapStateToProps
export default connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile
}))(wrappedLoggedInMenu);
