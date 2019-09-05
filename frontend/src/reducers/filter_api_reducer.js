import {
  RECEIVE_DEFAULT_VALUES,
  TOGGLE_LOADING
} from "../actions/filter_actions";

const initialState = {
  price: [],
  size: [],
  type: [{ value: "", label: "All" }],
  country: [{ value: "", label: "All" }],
  bathrooms: [{ value: "", label: "All" }],
  bedrooms: [{ value: "", label: "All" }],
  selectedPrice: [],
  selectedSize: [],
  selectedType: { value: "", label: "All" },
  selectedBathrooms: { value: "", label: "All" },
  selectedBedrooms: { value: "", label: "All" },
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DEFAULT_VALUES: {
      const { price, size, type, bathrooms, bedrooms } = action.data;
      return {
        ...state,
        price,
        size,
        type,
        bathrooms,
        bedrooms,
        selectedPrice: price,
        selectedSize: size,
        loading: false
      };
    }
    case TOGGLE_LOADING:
      return {
        ...state,
        loading: !state.loading
      };
    default:
      return state;
  }
}
