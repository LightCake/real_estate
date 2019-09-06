import { RECEIVE_GENERAL_DATA } from "../actions/property_actions";

const initialState = {
  users: 0,
  listed: 0,
  sold: 0,
  countries: 0,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_GENERAL_DATA:
      return {
        ...action.data
      };
    default:
      return state;
  }
}
