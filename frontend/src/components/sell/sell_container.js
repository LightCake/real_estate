import { connect } from "react-redux";
import Sell from "./sell";
import { list } from "../../actions/property_actions";

const mapStateToProps = state => ({
  user: state.session.user
});

const mapDispatchToProps = dispatch => ({
  list: property => dispatch(list(property))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sell);
