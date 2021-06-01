import articleApi from "@/api/article.js";
const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const mutationTypes = {
  editArticleStart: "[editArticle] Edit article start",
  editArticleSuccess: "[editArticle] Edit article success",
  editArticleFailed: "[editArticle] Edit article failed",

  getArticleStart: "[editArticle] Get article start",
  getArticleSuccess: "[editArticle] Get article success",
  getArticleFailed: "[editArticle] Get article failed",
};

export const actionTypes = {
  editArticle: "[editArticle] Edit article",
  getArticle: "[editArticle] Get article",
};

const mutations = {
  [mutationTypes.editArticleStart](state) {
    state.isSubmitting = true;
  },

  [mutationTypes.editArticleSuccess](state) {
    state.isSubmitting = false;
  },

  [mutationTypes.editArticleFailed](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
  },

  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },

  [mutationTypes.getArticleFailed](state) {
    state.isLoading = false;
  },
};

const actions = {
  [actionTypes.editArticle](context, { slug, articleInput }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.editArticleStart);
      articleApi
        .editArticle(slug, articleInput)
        .then((article) => {
          context.commit(mutationTypes.editArticleSuccess, article);
          resolve(article);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.editArticleFailed,
            result.response.data.errors
          );
        });
    });
  },

  [actionTypes.getArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailed);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
