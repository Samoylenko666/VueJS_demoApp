import articleApi from "@/api/article.js";
const state = {
  isSubmitting: false,
  validationErrors: null,
};

export const mutationTypes = {
  createArticleStart: "[createArticle] Create article start",
  createArticleSuccess: "[createArticle] Create article success",
  createArticleFailed: "[createArticle] Create article failed",
};

export const actionTypes = {
  createArticle: "[createArticle] Create article",
};

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true;
  },

  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false;
  },

  [mutationTypes.createArticleFailed](state, payload) {
    state.isLoading = false;
    state.validationErrors = payload;
  },
};

const actions = {
  [actionTypes.createArticle](context, { articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.createArticleStart);
      articleApi
        .createArticle(articleInput)
        .then((article) => {
          context.commit(mutationTypes.createArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.createArticleFailed,
            result.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
