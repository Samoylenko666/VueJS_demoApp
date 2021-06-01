<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              Follow user button
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                Edit profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'userProfile',
                    params: { slug: userProfile.username },
                  }"
                  :class="{ active: routeName === 'userProfile' }"
                  v-if="isCurrentUserProfile"
                >
                  My Post
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'userProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                  :class="{ active: routeName === 'userProfileFavorites' }"
                  v-if="isCurrentUserProfile"
                >
                  Favorites Post
                </router-link>
              </li>
            </ul>
          </div>

          <AppFeed :apiUrl="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AppFeed from "@/components/Feed.vue";
import { actionTypes } from "@/store/modules/userProfile.js";
import { getterTypes as authGetterTypes } from "@/store/modules/auth.js";
export default {
  name: "AppUserProfile",
  components: {
    AppFeed,
  },

  computed: {
    ...mapState({
      userProfile: (state) => state.userProfile.data,
      validationErrors: (state) => state.userProfile.errors,
      isLoading: (state) => state.userProfile.isLoading,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }
      return this.currentUser.username === this.userProfile.username;
    },

    apiUrl() {
      const isFavorites = this.$route.path.includes("favorites");
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `articles?author=${this.userProfileSlug}`;
    },

    userProfileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    },
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile();
    },
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile() {
      this.$store.dispatch(actionTypes.getUserProfile, {
        slug: this.userProfileSlug,
      });
    },
  },
};
</script>
