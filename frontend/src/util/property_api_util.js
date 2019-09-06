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

export const fetchFilteredProperties = filter => {
  return axios.post("/api/properties/filter", filter);
};

export const fetchGeneral = () => {
  return axios.get("/api/properties/general");
};

export const fetchNewestProperties = type => {
  return axios.get(`/api/properties/newest/6/${type}`);
};
