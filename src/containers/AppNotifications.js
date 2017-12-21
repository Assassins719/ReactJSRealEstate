import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

/**
 * Wrapper for https://github.com/gor181/react-notification-system-redux, allowing us to define custom styling
 */
class AppNotifications extends Component {
  render() {
    const { notifications } = this.props;

    // Optional styling
    const style = {
      NotificationItem: {
        // Override the notification item
        DefaultStyle: {
          // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px'
        },

        success: {
          // Applied only to the success notification item
          color: 'red'
        }
      }
    };

    return <Notifications notifications={notifications} style={style} />;
  }
}

AppNotifications.propTypes = {
  notifications: PropTypes.array
};

export default connect(({ notifications }) => ({ notifications }))(
  AppNotifications
);
