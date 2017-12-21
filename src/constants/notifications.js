/**
 * A notification system that allows any part of the app to dispatch notifications is an integral part of a good user experience.
 *
 * React Notification System is used with the redux wrapper.
 * react-notification-system http://igorprado.com/react-notification-system/
 *
 * The AppNotifications component lives above the Routes, it's not a route, it's a series of modals that can be triggered anywhere inside the App using redux's dispatch.
 *
 * DEFAULTS
 Different default notififcations:
 dispatch(show(notification, level));
 dispatch(success(notification));
 dispatch(error(notification));
 dispatch(warning(notification));
 dispatch(info(notification));
 dispatch(hide(uid)); // Hides notification based on uid
 dispatch(removeAll()); // Removes all notifications
 * CUSTOMISING NOTIFICATION OBJECT
  https://github.com/igorprado/react-notification-system#creating-a-notification
 */

export const verifyEmailSentSuccess = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Verification email sent!',
  message: 'Double check your spam!',
  position: 'tr',
  autoDismiss: 0
  // action: {
  //   label: 'Click me!!',
  //   callback: () => alert('clicked!')
  // }
};

export const signupSuccessNotif = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Signup Successful!',
  position: 'tr',
  autoDismiss: 0
};

export const userAccountUpdatedSuccessNotif = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Updated Account Settings',
  position: 'tr',
  autoDismiss: 0
};

export const userRecoveryEmailSent = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Sent Recovery Email!',
  position: 'tr',
  autoDismiss: 0
};

export const userRecoveryEmailSendError = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'We had a problem sending your email',
  position: 'tr',
  autoDismiss: 0
};

export const H_propertyUpdated = {
  title: 'Updated Property',
  position: 'tr',
  autoDismiss: 1
};

export const H_propertyDeleted = {
  title: 'Removed Property',
  position: 'tr',
  autoDismiss: 1
};

const notificationOptions = {
  verifyEmailSentSuccess
};

export default notificationOptions;
