import { mutationTypes as authMutationTypes } from "@/store//modules/auth.js";
const state = {
  isSubmitting: false,
  validationErrors: null,
};



const mutations = {
  [authMutationTypes.updateCurrentUserStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },

  [authMutationTypes.updateCurrentUserSuccess](state) {
    state.isSubmitting = false;
  },

  [authMutationTypes.updateCurrentUserFailed](state, payload) {
    state.isLoading = false;
    state.validationErrors = payload;
    state.isSubmitting = false;
  },
};


export default {
  state,
  mutations,
};


