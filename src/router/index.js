import { createRouter, createWebHistory } from "vue-router";
import GlobalFeed from "@/views/GlobalFeed.vue";
import AppYourFeed from "@/views/YourFeed.vue";
import AppTagFeed from "@/views/TagFeed.vue";
import AppRegister from "@/views/Register.vue";
import AppLogin from "@/views/Login.vue";

const routes = [
  {
    path: "/register",
    name: "register",
    component: AppRegister,
  },
  {
    path: "/login",
    name: "login",
    component: AppLogin,
  },
  {
    path: "/",
    name: "globalFeed",
    component: GlobalFeed,
  },
  {
    path: "/feed",
    name: "yourFeed",
    component: AppYourFeed,
  },
  {
    path: "/tags/:slug",
    name: "tag",
    component: AppTagFeed,
  },
  {
    path: "/Profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: GlobalFeed,
  },
  {
    path: "/Profiles/:slug",
    name: "userProfile",
    component: GlobalFeed,
  },
  {
    path: "/articles/new",
    name: "createArticle",
    component: GlobalFeed,
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: GlobalFeed,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: GlobalFeed,
  },
  {
    path: "/settings",
    name: "settings",
    component: GlobalFeed,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
