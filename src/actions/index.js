/**
 *
 * Actions can be thunks and can have access to getFirebase in addition to dispatch and getState:
 * Since thunks can dispatch additional actions, can you dispatch notifications after something
 * finishes:
 export const addTodo = newTodo => (dispatch, getState, getFirebase) => {
  const firebase = getFirebase();
  firebase.push('/todos', { text: newTodo, done: false }).then(() => {
    dispatch(sendNotification('Todo Added'));
  });
};
 */

export const sendNotification = payload => {
  return {
    type: 'NOTIFICATION',
    payload
  };
};
