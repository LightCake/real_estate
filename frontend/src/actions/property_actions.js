import * as APIUtil from "../util/property_api_util";

export const RECEIVE_FILTERED_PROPERTIES = "RECEIVE_FILTERED_PROPERTIES";
export const RECEIVE_PROPERTY_ERRORS = "RECEIVE_PROPERTY_ERRORS";

export const receiveFilteredProperties = properties => ({
  type: RECEIVE_FILTERED_PROPERTIES,
  properties
});

export const receiveErrors = errors => ({
  type: RECEIVE_PROPERTY_ERRORS,
  errors
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
