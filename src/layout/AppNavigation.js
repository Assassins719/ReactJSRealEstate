import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Hotkey, Hotkeys, HotkeysTarget } from '@blueprintjs/core';
import MobileNavigation from './MobileNavigation/MobileNavigation';
import TabletNavigation from './TabletNavigation/TabletNavigation';
import DesktopNavigation from './DesktopNavigation/DesktopNavigation';
import navLoggedOut from './_navLoggedOut';
import navLoggedIn from './_navLoggedIn';
import MoreModal from './components/MoreModal';

// Navigation is deeply tied to the routes of the app, here we load the top-level navigation
// routes and pass
// them to the relevant device navigator

class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreModalOpen: false
    };
  }

  handleMoreModalClick = () => {
    this.setState({
      moreModalOpen: !this.state.moreModalOpen
    });
  };

  hideMoreModal = () => {
    this.setState({ moreModalOpen: false });
  };

  renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="shift + m"
          label="Open the more menu dialog"
          onKeyDown={() =>
            this.setState({
              moreModalOpen: !this.state.moreModalOpen
            })}
        />
      </Hotkeys>
    );
  }

  render() {
    let Navigation;
    switch (this.props.type) {
      case 'mobile':
        Navigation = MobileNavigation;
        break;
      case 'tablet':
        Navigation = TabletNavigation;
        break;
      case 'desktop':
        Navigation = DesktopNavigation;
        break;
      default:
        Navigation = DesktopNavigation;
        break;
    }

    const { auth, housingProvider } = this.props;
    let navItems;
    if ((!isLoaded(auth))) {
      // Not loaded don't show the navBar
      return (
          <div>
            <MoreModal
                moreModalOpen={this.state.moreModalOpen}
                hideMoreModal={this.hideMoreModal}
            />
            <div
                style={{
                  paddingBottom: this.props.type === 'tablet' ||
                  this.props.type === 'mobile'
                      ? '60px'
                      : '0px'
                }}
            >
              {this.props.children}
            </div>
          </div>
      )
    } else if (isEmpty(auth)) {
      // Loaded, but logged out
      navItems = navLoggedOut.items
    } else if (isLoaded(auth) && !isEmpty(auth) && housingProvider) {
      // Loaded, logged in, housingProvider
      navItems = navLoggedIn.housingProvider.items
    } else {
      // Loaded, logged in, tenant
      navItems = navLoggedIn.tenant.items
    }


    return (
      // Navigation assigned to result of switch statement
      // They all receive the same navItems
      <Navigation
        moreModalClicked={this.handleMoreModalClick}
        navItems={navItems}
      >
        <MoreModal
          moreModalOpen={this.state.moreModalOpen}
          hideMoreModal={this.hideMoreModal}
          navItems={navItems}
        />
        <div
          style={{
            paddingBottom: this.props.type === 'tablet' ||
              this.props.type === 'mobile'
              ? '60px'
              : '0px'
          }}
        >
          {this.props.children}
        </div>
      </Navigation>
    );
  }
}

HotkeysTarget(AppNavigation);
const fbWrapAppNavigation = firebaseConnect()(AppNavigation);

// Needs to be fixed
export default connect(({ firebase: { auth, profile: { housingProvider } } }) => ({
  auth,
  housingProvider
}))(fbWrapAppNavigation);
