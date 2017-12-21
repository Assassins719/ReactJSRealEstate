# Stripe

API keys are found in Firebase Functions and in the Elements wrapper `<StripeProvider>`.


Example values for testing
https://stripe.com/docs/testing#international-cards
````js
const testCardValues = {
  number: '4000058260000005',
  cvc: '123',
  exp_month: '10',
  exp_year: '2022',
  address_zip: 'W1T 5HB'
};
````

### Intro

We use the v3 version of the API using react-stripe-elements. https://github.com/stripe/react-stripe-elements#demo 

Understanding what Elements is, and why it's used in v3 is crucial to understanding the implementation. Please read the Stripe docs.

### Implementation
We add Housing Association accounts on signup as Customers to Stripe using a Firebase function.

// When a user is created, register them with Stripe
````js
exports.createStripeCustomer = functions.auth.user().onCreate(event => {
  const data = event.data;
  return stripe.customers.create({
    email: data.email
  }).then(customer => {
    return admin.database().ref(`/stripe_customers/${data.uid}/customer_id`).set(customer.id);
  });
});
````
We do this for both Tenants and Housing Associations in case a Tenant later becomes a Housing Association.

Upon logging in Housing Associations will have to verify email and be manually verified by an administrator to add properties.

At this stage in the HA user flow we encourage them to sign up to a Stripe *subscription*. 

Using the [Stripe Dashboard - Subscriptions - Plans](https://dashboard.stripe.com/test/plans) we've created a basic plan.

Our plan is a Monthly 9.99 GBP with 30 Day trial.

A Customer can Subscribe to a plan if there's a trial, however they would need to add their payment details to then be billed once it finishes. 

We ask Housing Associations to add a Payment Method and subscribe to a Subscription, once this is done an admin can choose to verify them which allows them to add Properties.

We do this in two steps:
1. Housing Association adds a Payment Method (card) in their /account and create a Stripe token using [` Stripe.card.createToken`](https://stripe.com/docs/api#create_card_token) on the client side with this information. We use this token and write it to RTDB: /stripe_customers/${this.currentUser.uid}/sources

2. We use a Firebase Function to listen to changes, pick up the token and [`stripe.createSource`](https://stripe.com/docs/api#create_card) inside the function.

1. Client side function `submitNewCreditCard`:
````js
Stripe.card.createToken({
  number: this.newCreditCard.number,
  cvc: this.newCreditCard.cvc,
  exp_month: this.newCreditCard.exp_month,
  exp_year: this.newCreditCard.exp_year,
  address_zip: this.newCreditCard.address_zip
}, (status, response) => {
  if (response.error) {
    this.newCreditCard.error = response.error.message;
  } else {
    firebase.database().ref(`/stripe_customers/${this.currentUser.uid}/sources`).push({token: response.id}).then(() => {
      this.newCreditCard = {
        number: '',
        cvc: '',
        exp_month: 1,
        exp_year: 2017,
        address_zip: ''
      };
    });
  }
});
````

2. Firebase Function `addPaymentSource` :
````js
// Add a payment source (card) for a user by writing a stripe payment source token to Realtime database
exports.addPaymentSource = functions.database.ref('/stripe_customers/{userId}/sources/{pushId}/token').onWrite(event => {
  const source = event.data.val();
  if (source === null) return null;
  return admin.database().ref(`/stripe_customers/${event.params.userId}/customer_id`).once('value').then(snapshot => {
    return snapshot.val();
  }).then(customer => {
    return stripe.customers.createSource(customer, {source});
  }).then(response => {
      return event.data.adminRef.parent.set(response);
    }, error => {
      return event.data.adminRef.parent.child('error').set(userFacingMessage(error)).then(() => {
        return reportError(error, {user: event.params.userId});
      });
  });
});
````

