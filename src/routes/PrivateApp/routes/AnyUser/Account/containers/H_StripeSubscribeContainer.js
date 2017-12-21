import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';
import H_Checkout from '../components/H_Checkout';

/**
 * Housing Association adds a Payment Method (card) in their /account and create a Stripe token using [` Stripe.card.createToken`](https://stripe.com/docs/api#create_card_token) on the client side with this information. We use this token and write it to RTDB: /stripe_customers/${this.currentUser.uid}/sources
 */
class H_StripeSubscribeContainer extends React.Component {
  // If we wanted to try using v2 of the Stripe API we could Redux form the handleSubmit here.
  // https://github.com/firebase/functions-samples/blob/master/stripe/public/index.html#L30

  render() {
    return (
      <div>
        {window.Stripe
          ? <StripeProvider apiKey="pk_test_Yu7xQIMUsT6pZo2JZppy4Hi4">
              <H_Checkout uid={this.props.uid} firebase={this.props.firebase} />
            </StripeProvider>
          : null}
      </div>
    );
  }
}

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth: { uid } } }) => ({
    uid
  }))
)(H_StripeSubscribeContainer);
