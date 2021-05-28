import popularTagApi from "@/api/popularTag.js";
const state = {
  data: null,
  isLoading: false,
  errors: null,
};

export const mutationTypes = {
  getPopularTagStart: "[PopularTag] Get PopularTag start",
  getPopularTagSuccess: "[PopularTag] Get PopularTagsuccess",
  getPopularTagdFailed: "[PopularTag] Get PopularTag failed",
};

export const actionTypes = {
  getPopularTag: "[PopularTag] Get PopularTag",
};

const mutations = {
  [mutationTypes.getPopularTagStart](state) {
    state.isLoading = true;
    state.data = null;
  },

  [mutationTypes.getPopularTagSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },

  [mutationTypes.getPopularTagFailed](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getPopularTag](context) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getPopularTagStart);
      popularTagApi.getPopularTag()
        .then((tags) => {
          context.commit(mutationTypes.getPopularTagSuccess, tags);
          resolve(tags);
        })
        .catch(() => {
          context.commit(mutationTypes.getPopularTagFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
