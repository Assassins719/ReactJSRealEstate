import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import Account from '../components/Account';
import Loading from '../../../../../../components/Loading';
import {
  updateUserAccountSettings,
  logOut
} from '../../../../../../actions/user';

class AccountContainer extends Component {
  handleUpdateAccountSettings = newAccountSettings => {
    console.log(newAccountSettings);
    this.props.updateUserAccountSettings(newAccountSettings);
  };

  handleLogout = () => {
    this.props.logOut();
  };

  render() {
    const { auth, profile } = this.props;

    if (!isLoaded(profile)) {
      return <Loading />;
    }

    return (
      <div>
        {/* Use initialValues to 'prefill' the form state https://redux-form.com/6.6.3/examples/initializefromstate/*/}
        {/* housingProvider should be stored under Profile */}
        <Account
          auth={auth}
          housingProvider={profile.housingProvider}
          adminVerifiedHousingProvider={profile.adminVerifiedHousingProvider}
          logOut={this.handleLogout}
          onSubmit={this.handleUpdateAccountSettings}
          initialValues={profile}
        />
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { auth, profile } }) => ({
      auth,
      profile
    }),
    { updateUserAccountSettings, logOut }
  )
)(AccountContainer);
