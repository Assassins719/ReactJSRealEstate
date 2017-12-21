import React from 'react';
import { Alert, Button } from 'reactstrap';
import { injectStripe } from 'react-stripe-elements';

// https://github.com/stripe/react-stripe-elements#troubleshooting
class H_SubscriptionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      buttonDisabled: false,
      hasWorkingPaymentSource: false,
      activeSubscription: null
    };
  }

  componentDidMount() {
    // 1. Check if they have a card, if not don't render subscriptions options
    // 2. Next if already on a subscription show which one they are on with option to cancel
    // 3. If not, present options to subscribe

    // 1. Firebase Listener listening for changes to the Payment Sources for the user
    this.props.firebase.database()
        .ref(`/stripe_customers/${this.props.uid}/sources`)
        .on('value', snap => {
          console.log(snap.val())
          if (snap.val()) {
            // TODO: We have at least something, need to check if there's an error
            this.setState({
              hasWorkingPaymentSource: true
            });
          }
        });

    // Next if already on a subscription
    // If not, present options
    // If they are, show which one they are on with option to cancel
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.uid}/subscriptions`)
      .on('value', snap => {
        console.log(snap.val());
        if (snap.val()) {
          // We have saved subscriptions
          const subscriptions = snap.val();
          // Todo: what if there's an error in this location?

          // Find if there's a subscription with status = active
          const statusOfSubscriptionsArr = Object.keys(subscriptions).map(
            fbKey => subscriptions[fbKey].status
          );
          if (statusOfSubscriptionsArr.includes('active')) {
            // there is an active subscription
            this.setState({
              activeSubscription: true
            });
          }
        } else {
          // Not ever tried to subscribe or null
          this.setState({
            activeSubscription: false
          });
        }
        this.setState({
          loading: false
        });
      });
  }

  handleStripeSubscribe(planId) {
    this.setState({
      buttonDisabled: true
    });

    // Subscribe them to a plan on Stripe
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.uid}/subscriptions`)
      .push({
        plan: planId
      })
      .then(() =>
        this.setState({
          buttonDisabled: false
        })
      );
  }

  render() {
    const { loading, activeSubscription, buttonDisabled } = this.state;


    if (loading) {
      return <div>Loading...</div>;
    }

    if (!this.state.hasWorkingPaymentSource) {
      return <div>Please add a card</div>;
    }

    // state where they do have an active card && subscription
    if (activeSubscription === true) {
      return <Alert>You are subscribed!</Alert>;
    }

    if (activeSubscription === false) {
      return (
        <div>
          You need to pick a Subscription plan:
          <div>
            <Button
              disabled={buttonDisabled}
              onClick={() => this.handleStripeSubscribe('basic-monthly')}
            >
              Subscribe £9.99/month
            </Button>
          </div>
        </div>
      );
    }
  }
}

// Avoid using react-redux here because of issues with injectStripe
export default injectStripe(H_SubscriptionsForm);
