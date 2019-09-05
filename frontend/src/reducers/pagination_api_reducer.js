import {
  RECEIVE_TOTAL_RECORDS,
  RECEIVE_CURRENT_AND_TOTAL_PAGE
} from "../actions/filter_actions";

const initialState = {
  totalRecords: null,
  currentPage: null,
  totalPages: null,
  pageLimit: 6,
  pageNeighbours: 2
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TOTAL_RECORDS:
      return {
        ...state,
        totalRecords: parseInt(action.total_records.count)
      };
    case RECEIVE_CURRENT_AND_TOTAL_PAGE:
      return {
        ...state,
        currentPage: action.pages.currentPage,
        totalPages: action.pages.totalPages
      };
    default:
      return state;
  }
}
