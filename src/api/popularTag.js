import axios from "./axios.js";

const getPopularTag = () => {
  return axios.get("/tags").then((res) => res.data.tags );
};

export default {
  getPopularTag,
};
