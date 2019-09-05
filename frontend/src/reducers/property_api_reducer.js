import { RECEIVE_FILTERED_PROPERTIES } from "../actions/property_actions";

const initialState = { filtered: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FILTERED_PROPERTIES:
      return {
        ...state,
        filtered: action.properties
      };
    default:
      return state;
  }
}
