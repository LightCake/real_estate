import { connect } from "react-redux";
import { fetchFilteredProperties } from "../../actions/property_actions";
import {
  fetchValues,
  toggleLoading,
  receiveCurrentAndTotalPage,
  update
} from "../../actions/filter_actions";
import Properties from "./properties";

const mapStateToProps = state => {
  return {
    properties: state.property.filtered,
    filter: state.filter,
    pagination: state.pagination
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchFilteredProperties: filter =>
      dispatch(fetchFilteredProperties(filter)),
    fetchValues: criteria => dispatch(fetchValues(criteria)),
    receiveCurrentAndTotalPage: pages =>
      dispatch(receiveCurrentAndTotalPage(pages)),
    toggleLoading: () => dispatch(toggleLoading()),
    update: field => data => dispatch(update(field)(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Properties);
