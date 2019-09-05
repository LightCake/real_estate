import axios from "axios";

export const fetchValues = criteria => {
  return axios.post("/api/properties/set_filter", criteria);
};

export const getPropertyCount = () => {
  return axios.get("/api/properties/count");
};
