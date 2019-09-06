import {
  RECEIVE_FILTERED_PROPERTIES,
  RECEIVE_NEWEST_PROPERTIES
} from "../actions/property_actions";

const initialState = { filtered: [], newest: [] };

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FILTERED_PROPERTIES:
      return {
        ...state,
        filtered: action.properties
      };
    case RECEIVE_NEWEST_PROPERTIES:
      return {
        ...state,
        newest: action.properties
      };
    default:
      return state;
  }
}
