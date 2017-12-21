import React from 'react';
import { Alert, Button } from 'reactstrap';
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements';

// Event handlers can be used on each Stripe element
// const handleBlur = () => {
//   console.log('[blur]');
// };
// const handleChange = change => {
//   console.log('[change]', change);
// };
// const handleClick = () => {
//   console.log('[click]');
// };
// const handleFocus = () => {
//   console.log('[focus]');
// };
// const handleReady = () => {
//   console.log('[ready]');
// };

// Each field has has the ability to be styled
const createOptions = fontSize => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, Menlo, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

// https://github.com/stripe/react-stripe-elements#troubleshooting
class H_CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      submitting: false,
      stripeError: null,
      userHasAtLeastOneCardAdded: false,
      userCards: null
    };
  }

  componentDidMount() {
    // Check to see if the user has a card added
    // If they do: They can edit or remove it
    // If they don't: They need to add one before they can subscribe to a plan <- We handle this in another component?
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.uid}/sources`)
      .once('value')
      .then(snap => {
        if (snap.val()) {
          // We have saved card(s)
          console.log(snap.val());
          this.setState({
            userCards: snap.val(),
            userHasAtLeastOneCardAdded: true
          });
        } else {
          // No sources = no payments, need to show them form
        }
        this.setState({
          loading: false
        });
      });
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    // this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({ token }) => {
    //   console.log('Received Stripe token:', token);
    // });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    this.setState({ submitting: true });

    this.props.stripe.createToken().then(payload => {
      if (payload.error) {
        // https://stripe.com/docs/api/node#error_handling
        console.error(payload.error);
        this.setState({ submitting: false });
        return this.setState({
          stripeError: payload.error.message
        });
      }
      // No error, should have a token
      this.setState({ submitting: false, stripeError: null });
      this.props.firebase
        .database()
        .ref(`/stripe_customers/${this.props.uid}/sources`)
        .push({ token: payload.token.id })
        .then(() => {
          // Should execute addPaymentSource Firebase Function
          this.setState({
            userHasCardAdded: true
          });
        });
    });
  }

  render() {
    const { loading, userHasAtLeastOneCardAdded, userCards } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }
    if (userHasAtLeastOneCardAdded) {
      return (
        <div>
          <p><strong>Cards Securely On File:</strong></p>
          <ul>
            {userCards
              ? Object.keys(userCards).map(
                  card =>
                    card
                      ? <li key={Math.random()}>
                          {userCards[card].brand}{' '}{userCards[card].last4}
                        </li>
                      : null
                )
              : null}

          </ul>

        </div>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          style={{
            margin: '0 auto',
            maxWidth: '800px',
            boxSizing: 'border-box',
            padding: '0 5px'
          }}
        >
          <label>
            Card number
            <CardNumberElement {...createOptions(this.props.fontSize)} />
          </label>
        </div>
        <div>
          <label>
            Expiration date
            <CardExpiryElement {...createOptions(this.props.fontSize)} />
          </label>
        </div>
        <div>
          <label>
            CVC
            <CardCVCElement {...createOptions(this.props.fontSize)} />
          </label>
        </div>
        <div>
          <label>
            Postal code
            <PostalCodeElement {...createOptions(this.props.fontSize)} />
          </label>
        </div>
        {this.state.stripeError
          ? <Alert color={'danger'}>
              {this.state.stripeError}
            </Alert>
          : null}
        <Button disabled={this.state.submitting}>Add Card</Button>
      </form>
    );
  }
}

// Avoid using react-redux here because of issues with injectStripe
export default injectStripe(H_CheckoutForm);
