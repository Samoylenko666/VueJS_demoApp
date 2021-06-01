import axios from "./axios.js";

const getUserProfile = (slug) => {
  return axios.get(`/profiles/${slug}`).then((res) => res.data.profile);
};

export default {
  getUserProfile,
};
