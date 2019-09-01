import axios from "axios";

export const list = propertyData => {
  return axios.post("/api/properties", propertyData);
};

export const addImages = propertyImages => {
  return axios.post("/api/properties/add-images", propertyImages);
};

export const addAddress = propertyAddress => {
  return axios.post("/api/properties/add-address", propertyAddress);
};
