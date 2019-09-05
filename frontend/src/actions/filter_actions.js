import * as APIUtil from "../util/filter_api_util";

export const RECEIVE_TOTAL_RECORDS = "RECEIVE_TOTAL_RECORDS";
export const RECEIVE_CURRENT_AND_TOTAL_PAGE = "RECEIVE_CURRENT_TOTAL_PAGE";
export const RECEIVE_DEFAULT_VALUES = "RECEIVE_DEFAULT_VALUES";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const RECEIVE_UPDATED_FIELD = "RECEIVE_UPDATED_FIELD";

export const receiveDefaultValues = data => ({
  type: RECEIVE_DEFAULT_VALUES,
  data
});

export const receiveTotalRecords = total_records => ({
  type: RECEIVE_TOTAL_RECORDS,
  total_records
});

export const receiveCurrentAndTotalPage = pages => ({
  type: RECEIVE_CURRENT_AND_TOTAL_PAGE,
  pages
});

export const receiveUpdatedField = (field, update) => ({
  type: RECEIVE_UPDATED_FIELD,
  update,
  field
});

/*
 * Fetches
 * - total number of properties
 * - default filter values for
 *   - price/size slider
 *   - type/bedrooms/bathrooms select boxed
 */
export const fetchValues = criteria => dispatch => {
  APIUtil.getPropertyCount()
    .then(res => dispatch(receiveTotalRecords(res.data)))
    .then(() =>
      APIUtil.fetchValues(criteria).then(res => {
        const { min_max, distinct } = res.data;
        const { min_price, max_price, min_size, max_size } = min_max;
        const obj = {
          price: [min_price, max_price],
          size: [min_size, max_size],
          type: [],
          bedrooms: [],
          bathrooms: []
        };
        const selects = ["type", "bedrooms", "bathrooms"];
        for (let temp of distinct) {
          for (let select of selects) {
            if (!obj[select].some(unit => unit.value === temp[select])) {
              obj[select].push({ value: temp[select], label: temp[select] });
            }
          }
        }
        for (let select of selects) {
          obj[select].sort((a, b) =>
            a.value > b.value ? 1 : b.value > a.value ? -1 : 0
          );
        }
        dispatch(receiveDefaultValues(obj));
      })
    );
};

export const toggleLoading = () => ({
  type: TOGGLE_LOADING
});

export const update = field => update => dispatch => {
  dispatch(receiveUpdatedField(field, update));
};
