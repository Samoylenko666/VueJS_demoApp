import auhtApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";
const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
  isLoading: false,
};

export const mutationTypes = {
  registerStart: "[auth] registerStart",
  registerSuccess: "[auth] registerSuccess",
  registerFailed: "[auth] registerFailed",
  loginStart: "[auth] loginStart",
  loginSuccess: "[auth] loginSuccess",
  loginFailed: "[auth] loginFailed",

  getCurrentUserStart: "[auth] getCurrentUserStart",
  getCurrentUserSuccess: "[auth] getCurrentUserSuccess",
  getCurrentUserFailed: "[auth] getCurrentUserFailed",
};
export const actionTypes = {
  register: "[auth] register",
  login: "[auth] login",
  getCurrentUser: "[auth] getCurrentUser",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
};

const getters = {
  [getterTypes.currentUser]: (state) => {
    return state.currentUser;
  },
  [getterTypes.isLoggedIn]: (state) => {
    return Boolean(state.isLoggedIn);
  },
  [getterTypes.isAnonymous]: (state) => {
    return state.isLoggedIn === false;
  },
};
const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.currentUser = payload;
    state.isSubmitting = false;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailed](state, payload) {
    state.validationErrors = payload;
    state.isSubmitting = false;
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.currentUser = payload;
    state.isSubmitting = false;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailed](state, payload) {
    state.validationErrors = payload;
    state.isSubmitting = false;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
    state.isLoading = false;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailed](state) {
    state.isLoggedIn = false;
    state.isLoading = false;
    state.currentUser = null;
  },
};
const actions = {
  [actionTypes.register](context, credentials) {
    context.commit(mutationTypes.registerStart);

    return new Promise((resolve) => {
      auhtApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          resolve(response.data.user);
          //Добавление в localstorage
          setItem("accessToken", response.data.user.token);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.registerFailed,
            result.response.data.errors
          );
        });
    });
  },

  [actionTypes.login](context, credentials) {
    context.commit(mutationTypes.loginStart);
    return new Promise((resolve) => {
      auhtApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          resolve(response.data.user);
          //Добавление в localstorage
          setItem("accessToken", response.data.user.token);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.loginFailed,
            result.response.data.errors
          );
        });
    });
  },

  [actionTypes.getCurrentUser](context) {
    context.commit(mutationTypes.getCurrentUserStart);
    return new Promise((resolve) => {
      auhtApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailed);
        });
    });
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
