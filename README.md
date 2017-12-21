## HomePointr

- Authentication with email+password (x)
- Sending transactional email when new user signed up. ( Can be done in firebase ) (x)
- User Roles (x)
- Page for users to edit Profile (Needs more info about User model)
- Page for hosts to create/edit properties <- Almost finished
- Property searching system with basic criteria <- Utilise Algolia's React Instantsearch
- Function to upload images for a new property. <- Leave to last
- Property expression of interest system
  - User Clicks "Interested" on a property
  - /properties/propertyId/tenantsInterested/userUid
  - Housing Provider that has properties, opens Property Manager,
  - finds properties under /users/userUid/haUserProperties/
  - Loops over them and finds see the interested parties
- Authentication with Facebook (x)
- Handling payment system with Stripe

## Routes

Auth or Not Authd
/ <- Routes to <PrivateApp/> if Auth'd
/signup
/login
/recover

Private App
/ <- Swaps based on Tenant or Housing Provider role inside User's Firebase Profile  
/account <- same component for Tenant and Housing Provider

Tenant App
/search-properties <- Search

Housing Provider App
/properties <- Create and Edit

## Models


### User Model
email: signupFormData.email,
housingProvider: true,
adminVerifiedHousingProvider: false

Email Verified lives in the auth object?

## Property

```
properties: {
    firebaseUid: {
      landlordName: 'Bield Housing & Care',
      lettingType: 'Supported Housing',
      ref: 'BDF00456',
      images: [
        'http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg',
        'http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg',
        'http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg',
        'http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg'
      ],
      keyFacts: [
        '1st Floor (lift not available',
        'flat',
        '1 bedroom',
        'Closure date: 30th may 2018 at 12.30'
      ],
      charges: {
        rent: '£297.33 Monthly',
        energyAndHeating: '£27.59 monthly',
        tenancyAndService: '£142.76 monthly',
        total: '£467.68 Monthly (not including and future charges'
      },
      features: {},
      other: [
        '1 bedroom flat, 1st floor (no lift available)',
        'Wet Floor Show'
      ],
      yourNearest: {
        transportLinks: 'Bus stop (0.1 miles)',
        education: 'Primary school (0.1 miles), Secondary school (0.3 miles)',
        pubsBarsRestaurants:
          'Hen volunatary Service (0.5 miles), Colny Fish (0.5 miles)'
      },
      mapData: {
        long: 'longitude',
        lat: 'latitude'
      },
      landlordInformation: {}
    }
  }
```

## Dependencies
Note that react-redux-firebase is in beta, react-router-redux is in alpha to support the v4.x API of react-router(-dom), boostrap has been in alpha for ages.

### Create-React-App
For handling all the webpack bundling and much more!

### React
- "prop-types": "^15.5.10",
- "react": "^15.6.1"
- "react-addons-css-transition-group": "^15.6.0",
- "react-addons-transition-group": "^15.6.0"
- "react-dom": "^15.6.1",

### Redux
- "react-redux": "^5.0.6",
- "redux": "^3.7.2",
- "redux-thunk": "^2.2.0"

### UI Elements and Libraries (requires CSS)
- "bootstrap": "4.0.0-alpha.6",
- "reactstrap": "^4.8.0",
 
### Notifications
- "react-notification-system": "^0.2.15",
- "react-notification-system-redux": "^1.1.4",
 
### Firebase & RRF (includes auth, db etc) 
- "firebase": "^4.2.0",
- "react-redux-firebase": "^2.0.0-beta.8",

### Persistent Client-side State
- "redux-persist": "^4.9.1",

### Routing
- "history": "^4.7.2",
- "react-router-dom": "^4.2.2",
- "react-router-redux": "^5.0.0-alpha.6",
- "redux-auth-wrapper": "^2.0.1",
 
### Forms
- "redux-form": "^7.0.4",
     
### ESLint
Airbnb + Prettier

### Search (Algolia)
React InstantSearch: https://community.algolia.com/react-instantsearch/Getting_started.html
Redux: https://discourse.algolia.com/t/exporting-react-instantsearch-state/413
https://community.algolia.com/react-instantsearch/examples/tourism/
- https://getstream.io/blog/cabin-react-redux-example-app-algolia/

### React-Redux-Firebase: Firebase

#### addTodo Thunk Action:
```js
export const addTodo = newTodo => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.push('/todos', { text: newTodo, done: false }).then(() => {
    dispatch(sendNotification('Todo Added'));
  });
};
```


#### Todos.js:
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import TodoItem from './TodoItem';
import {addTodo} from "../actions/index";

class Todos extends Component {

  addTodo = () => {
    const { newTodo } = this.refs;
    // Dispatch is available under props when we use connect() from react-redux
    const { dispatch } = this.props;
    return this.props.firebase
      .push('/todos', { text: newTodo.value, done: false })
      .then(() => {
        newTodo.value = '';
        console.log('Todo Created!');
      });
  };

  render() {
    const { todos, dispatch } = this.props;

    const todosList = !isLoaded(todos)
      ? 'Loading'
      : isEmpty(todos)
        ? 'Todo list is empty'
        : Object.keys(todos).map(key =>
            <TodoItem key={key} id={key} todo={todos[key]} />
          );

    let input;
    return (
      <div>
        <ul>
          {todosList}
        </ul>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!input.value.trim()) {
              return;
            }
            dispatch(addTodo(input.value));
            input.value = '';
          }}
        >
          <input
            type="text"
            className="new-todo-input"
            autoFocus={true}
            placeholder="Send to Firebase"
            ref={node => (input = node)}
          />
        </form>
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.object,
  auth: PropTypes.object,
  firebase: PropTypes.object
};

// custom-react-scripts to add decorators
export default compose(
  firebaseConnect([
    '/todos' // { path: '/todos' } // object notation
  ]),
  connect(({ firebase: { data: { todos } } }) => ({
    todos // mapStateToProps shorthand state.firebase.data.todos to props.todos
  }))
)(Todos);
````

#### TodoItem.js
```js
import React, { Component } from "react";
import { firebase } from "react-redux-firebase";
import PropTypes from 'prop-types'

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  };

  render() {
    const { firebase, todo, id } = this.props;
    const toggleDone = () => {
      firebase.set(`/todos/${id}/done`, !todo.done);
    };

    const deleteTodo = () => {
      firebase.remove(`/todos/${id}`);
    };
    return (
      <li className="Todo">
        <input
          className="Todo-Input"
          type="checkbox"
          checked={todo.done}
          onChange={toggleDone}
        />
        {todo.text || todo.name}
        <button className="Todo-Button" onClick={deleteTodo}>
          Delete
        </button>
      </li>
    );
  }
}
export default firebase()(TodoItem);
```

## Inside Component vs Thunk

Just preference.

Inside:
````js
export default compose(
  firebaseConnect((props, firebase) => {
    const { match: { params: { id } } } = props;
    console.log(props.match.params.id);
    console.log('propertyId:', id);
    // const uid = firebase._.authUid;
    const propertyRef = `/properties/${id}/`;
    return [{ type: 'once', path: `${propertyRef}` }];
  }),
  connect(
    ({ firebase: { data: { properties } } }, { match: { params: { id } } }) => {
      if (properties === undefined || id === undefined) {
        return {};
      } else {
        return {
          property: properties[id]
        };
      }
    },
    null
  )
)(PropertyContainer);
````

ComponentDidMount + Thunk Action + Reducer + Connect (much more manual)
````js

/* ACTIONS */

export const REQUEST_PROPERTY = 'REQUEST_PROPERTY';

// Make Network Request
function requestProperty(propertyId) {
  console.log('request property');
  return {
    type: REQUEST_PROPERTY,
    propertyId
  };
}

/*
Note on Error Handling
Need to dispatch an action on request failure, see:
  http://redux.js.org/docs/introduction/Examples.html#real-world
 */
export const RECEIVE_PROPERTY = 'RECIEVE_PROPERTY';
function receiveProperty(propertyId, json) {
  return {
    type: RECEIVE_PROPERTY,
    propertyId,
    json,
    receivedAt: Date.now()
  };
}

export const fetchProperty = propertyId => (
  dispatch,
  getState,
  getFirebase
) => {
  dispatch(requestProperty(propertyId));
  const firebaseRrf = getFirebase();
  const propertyRef = firebaseRrf.ref(`/properties/${propertyId}`);
  propertyRef
    .once('value')
    .then(snap => {
      console.log('snapval', snap.val());
      snap.val()
        ? dispatch(receiveProperty(propertyId, snap.val()))
        : dispatch(receiveProperty(propertyId, {}));
    })
    .catch(() => {
      dispatch({
        type: 'FETCH_PROPERTY_FAILURE'
      });
    });
};

/* 
  REDUCER (Probably not production level Redux, 
  see the redux real-world and reddit app examples
  for more info 
*/
import { RECEIVE_PROPERTY, REQUEST_PROPERTY } from '../../actions/properties';

export default function propertyReducer(state = {
  isFetching: false,
  data: null
}, action) {
  switch (action.type) {
    case REQUEST_PROPERTY:
      return {
        isFetching: true
      };
    case RECEIVE_PROPERTY:
      return {
        data: action.json,
        isFetching: false
      };
    default:
      return state;
  }
}
````


## Firebase Querying Patterns

### Populate 

#### Motivation
>  It was originally based on populate from MongoDB (hence the name :neckbeard:), it always felt like Firebase was missing an equivalent feature. I have been writing similar logic for literally years (even before I was using redux), so it was a sigh of relief to have an easy place to work it into a library.
A common pattern in Firebase is to grab IDs of an entity that a user has saved and then grab the 
data of those IDs

- Owner of react-redux-firebase

Old Way:
````js
export const getDealTileById = id =>
  global.firebaseDB
    .ref(`deals/archive/${id}`)
    .once("value")
    .then(snap => snap.val())
    .catch(err => {
      throw new Error(
        `Seems something messed up while trying to get a saved deal by id. ${err.message}`
      );
    });


global.firebaseDB
  .ref(`users/${user.uid}/savedDeals`)
  .once("value")
  .then(snap => {
      // Object of *all* (including false) deal ID pairs
      const allSavedDealIds = snap.val();
      Promise.all(allSavedDealIds.map(id => getDealTileById(id)))
        .then(dealTiles => {
          if (dealTiles) {
            this.setState({
              done: true,
              savedDeals: dealTiles
            });
          }
        })
        .catch(err => {
          throw new Error(`${err.message}`);
        });
      })
  .catch(err => console.error(err.message));
````

New way using Populate:

```js
const populates = [{ child: 'savedDeals', root: 'deals/archive' }] // though I would place archived deals at the top like archivedDeals

compose(
  firebaseConnect([{ path: 'users', populates }]),
  connect(({ firebase }) => ({
    users: populate(firebase, 'users', populates)  // different if you are using v1
  })
))
````
#   R e a c t J S R e a l E s t a t e  
 