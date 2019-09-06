import * as APIUtil from "../util/property_api_util";

export const RECEIVE_FILTERED_PROPERTIES = "RECEIVE_FILTERED_PROPERTIES";
export const RECEIVE_PROPERTY_ERRORS = "RECEIVE_PROPERTY_ERRORS";
export const RECEIVE_GENERAL_DATA = "RECEIVE_GENERAL_DATA";
export const RECEIVE_NEWEST_PROPERTIES = "RECEIVE_NEWEST_PROPERTIES";

export const receiveFilteredProperties = properties => ({
  type: RECEIVE_FILTERED_PROPERTIES,
  properties
});

export const receiveErrors = errors => ({
  type: RECEIVE_PROPERTY_ERRORS,
  errors
});

export const receiveGeneralData = data => ({
  type: RECEIVE_GENERAL_DATA,
  data
});

export const receiveNewestProperties = properties => ({
  type: RECEIVE_NEWEST_PROPERTIES,
  properties
});

export const list = property => dispatch => {
  property.type = property.type.value;
  property.bed = property.bed.value;
  property.bath = property.bath.value;
  APIUtil.list(property)
    .then(res => {
      const property_id = res.data.id;
      // Add to the property images table
      const property_images = {
        id: property_id,
        images: property.images
      };
      APIUtil.addImages(property_images).then(res => {
        const property_address = {
          id: property_id,
          street: property.street,
          city: property.city,
          state: property.state,
          postal_code: property.postal_code,
          country: property.country
        };
        APIUtil.addAddress(property_address);
      });
    })
    .catch(err => dispatch(receiveErrors(err.response.data)));
};

export const fetchFilteredProperties = filter => dispatch => {
  APIUtil.fetchFilteredProperties(filter)
    .then(res => {
      const currentProperties = res.data;
      dispatch(receiveFilteredProperties(currentProperties));
    })
    .catch(err => dispatch(receiveErrors(err)));
};

export const fetchGeneralData = () => dispatch => {
  APIUtil.fetchGeneral().then(res => {
    const { data } = res;
    const temp = ["users", "listed", "sold", "countries"];
    const general_data = {};
    data.forEach((obj, index) => {
      general_data[temp[index]] = obj.count;
    });
    dispatch(receiveGeneralData(general_data));
  });
};

export const fetchNewestProperites = type => dispatch => {
  APIUtil.fetchNewestProperties(type).then(res =>
    dispatch(receiveNewestProperties(res.data))
  );
};
