const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
// const logging = require('@google-cloud/logging');

admin.initializeApp(functions.config().firebase);
const client = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.api_key
);

/**
 * @notInUse needs to setup StackDriver
 * @copiedFrom https://github.com/firebase/functions-samples/blob/master/stripe/functions/index.js#L100
 * @description To keep on top of errors,
 * we should raise a verbose error report with Stackdriver rather than simply relying on console.error.
 This will calculate users affected + send you email alerts, if you've opted into receiving them.
 [START reporterror]
 */
function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  const logName = 'errors';
  const log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: 'cloud_function',
      labels: { function_name: process.env.FUNCTION_NAME }
    }
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: 'cloud_function'
    },
    context: context
  };

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}
// [END reporterror]

/**
 *
 * @description Create a the Stripe subscription when a plan is is pushed to the Realtime database
 * this.props.firebase
 .database()
 .ref(`/stripe_customers/${this.props.uid}/subscriptions`)
 .push({
        plan: planId
      })
 */
//
exports.createStripeSubscription = functions.database
  .ref('/stripe_customers/{userId}/subscriptions/{id}')
  .onWrite(event => {
    // { plan: 'plan-written-to-view' }
    const val = event.data.val();

    // This onWrite will trigger whenever anything is written to the path, so
    // noop if the charge was deleted, errored out, or the Stripe API returned a result (id exists)
    if (val === null || val.id || val.error) return null;
    // Look up the Stripe customer id written in createStripeCustomer
    return admin
      .database()
      .ref(`/stripe_customers/${event.params.userId}/customer_id`)
      .once('value')
      .then(snapshot => {
        return snapshot.val();
      })
      .then(customer => {
        // Create a charge using the pushId as the idempotency key, protecting against double charges
        console.log('customer stripe id', customer);
        const planName = val.plan;
        console.log('planName is:', planName);
        return stripe.subscriptions.create({
          customer,
          items: [
            {
              plan: planName
            }
          ]
        });
      })
      .then(
        response => {
          // If the result is successful, write it back to the database
          // Can set up view to listen for this response
          console.log(response);
          return event.data.adminRef.set(response);
        },
        error => {
          // We want to capture errors and render them in a user-friendly way,
          // Remove stack driver for now
          return event.data.adminRef
            .child('error')
            .set(userFacingMessage(error))
            .then(() => {
              return console.error(error);
            });
        }
      );
  });
// [END chargecustomer]]

/**
 * @description Sanitize the error message for the user
 * @copiedFrom https://github.com/firebase/functions-samples/blob/master/stripe/functions/index.js#L136
 */
function userFacingMessage(error) {
  return error.type
    ? error.message
    : 'An error occurred, developers have been alerted';
}

const ALGOLIA_PROPERTIES_INDEX_NAME = 'homepointr';
/**
 * @description Updates the Algolia search index when new property entries are created or updated.
 */
exports.indexentry = functions.database
  .ref('/properties/{propertyId}')
  .onWrite(event => {
    const index = client.initIndex(ALGOLIA_PROPERTIES_INDEX_NAME);
    const firebaseObject = {
      data: event.data.val(),
      objectID: event.params.propertyId
    };
    console.log(firebaseObject);
    console.log(event);
    return index.saveObject(firebaseObject).then(
      () => console.log('done!')
      // event.data.adminRef.parent
      //   .child('last_index_timestamp')
      //   .set(Date.parse(event.timestamp))
    );
  });

const stripe = require('stripe')(functions.config().stripe.token);
const currency = functions.config().stripe.currency || 'USD';

/**
 * @description When a Housing Association signs up,
 * we add them as a Stripe Customer so that they can later signup to a subscription plan
 * https://dashboard.stripe.com/test/subscriptions
 *
 * @copiedFrom Roughly based off
 * https://github.com/firebase/functions-samples/blob/master/stripe/functions/index.js#L59
 *
 */
exports.createStripeCustomer = functions.auth.user().onCreate(event => {
  const data = event.data;
  console.log('data is:');
  console.log(data);
  return stripe.customers
    .create({
      email: data.email
    })
    .then(customer =>
      admin
        .database()
        .ref(`/stripe_customers/${data.uid}/customer_id`)
        .set(customer.id)
    );
});

/**
 * @copiedFrom
 * https://github.com/firebase/functions-samples/blob/master/stripe/functions/index.js#L69
 *
 */
exports.addPaymentSource = functions.database
  .ref('/stripe_customers/{userId}/sources/{pushId}/token')
  .onWrite(event => {
    const source = event.data.val();
    if (source === null) return null;
    console.log('source:');
    console.log(source);
    return admin
      .database()
      .ref(`/stripe_customers/${event.params.userId}/customer_id`)
      .once('value')
      .then(snapshot => {
        console.log('customer_id:');
        console.log(snapshot.val());
        return snapshot.val();
      })
      .then(customer => {
        // https://stripe.com/docs/sources/customers#attaching-a-source-to-an-existing-customer
        return stripe.customers.createSource(customer, { source });
      })
      .then(
        response => {
          return event.data.adminRef.parent.set(response);
        },
        error => {
          return event.data.adminRef.parent
            .child('error')
            .set(userFacingMessage(error))
            .then(() => {
              return console.log(error);
              // return reportError(error, { user: event.params.userId });
            });
        }
      );
  });

// When a user deletes their account, clean up after them
exports.cleanupUser = functions.auth.user().onDelete(event => {
  return admin
    .database()
    .ref(`/stripe_customers/${event.data.uid}`)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    })
    .then(customer => {
      return stripe.customers.del(customer.customer_id);
    })
    .then(() => {
      return admin
        .database()
        .ref(`/stripe_customers/${event.data.uid}`)
        .remove();
    });
});
