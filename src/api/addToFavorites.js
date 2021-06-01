import axios from "./axios.js";

const getURL = (slug) => `/articles/${slug}/favorite`;

const addToFavorites = (slug) => {
  const url = getURL(slug);
  return axios.post(url).then((res) => res.data.article);
};

const removeFromFavorites = (slug) => {
  const url = getURL(slug);
  return axios.delete(url).then((res) => res.data.article);
};

export default {
  removeFromFavorites,
  addToFavorites,
};
