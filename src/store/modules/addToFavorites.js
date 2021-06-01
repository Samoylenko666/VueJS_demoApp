import Api from "@/api/addToFavorites.js";

export const mutationTypes = {
  addToFavoritesStart: "[addToFavorites] add To Favorites start",
  addToFavoritesSuccess: "[addToFavorites] add To Favorites success",
  getArticleFailed: "[addToFavorites] add To Favorites failed",
};

export const actionTypes = {
  addToFavorites: "[addToFavorites] add To Favorites ",
};

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailed]() {},
};

const actions = {
  [actionTypes.addToFavorites](context, { slug, isFavorited }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.addToFavoritesStart);
      const promise = isFavorited
        ? Api.removeFromFavorites(slug)
        : Api.addToFavorites(slug);
        promise.then( article =>{
            context.commit(mutationTypes.addToFavoritesSuccess, article)
            resolve(article)
        }).catch(()=>{
            context.commit(mutationTypes.addToFavoritesFailed)
        })

    });
  },
};

export default {
  mutations,
  actions,
};
