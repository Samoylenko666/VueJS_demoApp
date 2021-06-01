import { createStore } from "vuex";
import auth from "./modules/auth";
import feed from "./modules/feed";
import popularTag from "./modules/popularTag";
import article from "./modules/article";
import createArticle from "./modules/createArticle";
import editArticle from "./modules/editArticle";
import settings from "./modules/settings";
import addToFavorites from "./modules/addToFavorites";
import  userProfile from "./modules/userProfile";
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTag,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile
  },
});
