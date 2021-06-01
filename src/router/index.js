import { createRouter, createWebHistory } from "vue-router";
import GlobalFeed from "@/views/GlobalFeed.vue";
import AppYourFeed from "@/views/YourFeed.vue";
import AppTagFeed from "@/views/TagFeed.vue";
import AppRegister from "@/views/Register.vue";
import AppLogin from "@/views/Login.vue";
import AppArticle from "@/views/Article.vue";
import AppCreateArticle from "@/views/CreateArticle.vue";
import AppEditArticle from "@/views/EditArticle.vue";
import AppSettings from "@/views/Settings.vue";
import AppUserProfile from "@/views/UserProfile.vue";

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
    path: "/profiles/:slug/favorites",
    name: "userProfileFavorites",
    component: AppUserProfile,
  },
  {
    path: "/profiles/:slug",
    name: "userProfile",
    component: AppUserProfile ,
  },
  {
    path: "/articles/new",
    name: "createArticle",
    component: AppCreateArticle,
  },
  {
    path: "/articles/:slug",
    name: "article",
    component: AppArticle,
  },
  {
    path: "/articles/:slug/edit",
    name: "editArticle",
    component: AppEditArticle,
  },
  {
    path: "/settings",
    name: "settings",
    component: AppSettings,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
