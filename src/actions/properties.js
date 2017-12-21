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
