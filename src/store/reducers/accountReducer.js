import { RECEIVE_ACCOUNT_INFO } from '../../actions/user';

export default function account(state = {
  loading: true,
  info: {
    housingProvider: null
  }
}, action) {
  switch (action.type) {
    case RECEIVE_ACCOUNT_INFO:
      return {
        ...state,
        loading: false,
        info: action.payload
      };
    default:
      return state;
  }
}
