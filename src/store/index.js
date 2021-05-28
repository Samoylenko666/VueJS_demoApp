import { createStore } from "vuex";
import auth from "./modules/auth";
import feed from "./modules/feed";
import popularTag from "./modules/popularTag";
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTag,
  },
});
