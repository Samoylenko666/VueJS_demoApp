import UserProfileApi from "@/api/userProfile.js";
const state = {
  data: null,
  isLoading: false,
  errors: null,
};

export const mutationTypes = {
  getUserProfileStart: "[getUserProfile] Get User Profile start",
  getUserProfileSuccess: "[getUserProfile] Get User Profile success",
  getUserProfileFailed: "[getUserProfile] Get User Profile failed",
};

export const actionTypes = {
  getUserProfile: "[getUserProfile] Get User Profile",
};

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true;
    state.data = null;
  },

  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },

  [mutationTypes.getUserProfileFailed](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.getUserProfile](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getUserProfileStart);
      UserProfileApi.getUserProfile(slug)
        .then((res) => {
          context.commit(mutationTypes.getUserProfileSuccess, res);
          resolve(res);
        })
        .catch(() => {
          context.commit(mutationTypes.getUserProfileFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
