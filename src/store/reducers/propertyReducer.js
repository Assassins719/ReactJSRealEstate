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
