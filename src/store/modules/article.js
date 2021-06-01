import articleApi from "@/api/article.js";
const state = {
  data: null,
  isLoading: false,
  errors: null,
};

export const mutationTypes = {
  getArticleStart: "[article] Get article start",
  getArticleSuccess: "[article] Get article success",
  getArticleFailed: "[article] Get article failed",

  deleteArticleStart: "[article] Delete article start",
  deleteArticleSuccess: "[article] Delete article success",
  deleteArticleFailed: "[article] Delete article failed",
};

export const actionTypes = {
  getArticle: "[article] Get article",
  deleteArticle: "[article] Delete article",
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },

  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },

  [mutationTypes.getArticleFailed](state) {
    state.isLoading = false;
  },

  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deletetArticleStart]() {},
  [mutationTypes.deleteArticleStart]() {},
};

const actions = {
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

  [actionTypes.deleteArticle](context,{slug}) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.deleteArticleStart);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.getArticleSuccess);
          resolve();
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailed);
        });
    });
  },
 

  
};

export default {
  state,
  mutations,
  actions,
};
