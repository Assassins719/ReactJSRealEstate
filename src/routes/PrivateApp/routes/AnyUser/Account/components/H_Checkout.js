import React from 'react';
import {
  Card,
  CardHeader,
  CardText
} from 'reactstrap';
import { Elements } from 'react-stripe-elements';
import H_CheckoutForm from './H_CheckoutForm';
import H_SubscriptionsForm from './H_SubscriptionsForm';

/**
 * Based strongly off the react-stripe-elements demo
 * https://jsfiddle.net/g9rm5qkt/
 */
class H_Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px'
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' });
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({ elementFontSize: '18px' });
      }
    });
  }

  render() {
    const { elementFontSize } = this.state;
    return (
      <div>
        {/* Elements only takes one child? */}
        <Card>
          <CardHeader>Payment Settings</CardHeader>
          <div style={{ padding: '16px' }}>
            <CardText>
              Please ensure you're entered a valid Credit or Debit card.
              Once successful you'll be able to choose a subscription plan.
            </CardText>
            <Elements>
              <H_CheckoutForm
                uid={this.props.uid}
                firebase={this.props.firebase}
                fontSize={elementFontSize}
              />
            </Elements>
          </div>
        </Card>

        <div style={{ height: '32px' }} />

        <Card>
          <CardHeader>Subscription Settings</CardHeader>
          <div style={{ padding: '16px' }}>
            <Elements>
              <H_SubscriptionsForm
                  uid={this.props.uid}
                  firebase={this.props.firebase}
              />
            </Elements>
          </div>
        </Card>

        <div style={{ height: '32px' }} />

      </div>
    );
  }
}

export default H_Checkout;
