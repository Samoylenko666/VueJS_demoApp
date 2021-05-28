import axios from "./axios.js";

const getFeed = (apiUrl) => {
  return axios.get(apiUrl);
};

export default {
  getFeed,
};
