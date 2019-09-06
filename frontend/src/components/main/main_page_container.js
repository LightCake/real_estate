import { connect } from "react-redux";
import {
  fetchGeneralData,
  fetchNewestProperites
} from "../../actions/property_actions";
import { fetchValues, update } from "../../actions/filter_actions";
import MainPage from "./main_page";

const mapStateToProps = state => {
  return {
    properties: state.property.newest,
    filter: state.filter,
    pagination: state.pagination,
    general: state.general
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchValues: criteria => dispatch(fetchValues(criteria)),
    update: field => data => dispatch(update(field)(data)),
    fetchGeneralData: () => dispatch(fetchGeneralData()),
    fetchNewestProperties: type => dispatch(fetchNewestProperites(type))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
