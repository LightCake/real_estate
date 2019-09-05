import { combineReducers } from "redux";
import session from "./session_api_reducer";
import property from "./property_api_reducer";
import pagination from "./pagination_api_reducer";
import filter from "./filter_api_reducer";
import errors from "./errors_reducer";

const RootReducer = combineReducers({
  session,
  property,
  pagination,
  filter,
  errors
});

export default RootReducer;
