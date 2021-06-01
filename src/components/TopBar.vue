<template>
  <nav class="navbar navbar=light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'globalFeed' }">
        Demo App
      </router-link>

      <ul class="nav navbar-nav pull-xs-right ">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'globalFeed' }">
            Home
          </router-link>
        </li>
        <template v-if="isLogged">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'createArticle',
                params: { slug: currentUser.username },
              }"
            >
              <i class="ion-compose"> &nbsp; NewArtilce </i>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'settings' }">
              <i class="ion-gear-a"> &nbsp; Settings </i>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{
                name: 'userProfile',
                params: { slug: currentUser.username },
              }"
            >
              <img class="user-pic" :src="currentUser.image" /> &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>

        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">
              &nbsp; Sign in
            </router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">
              &nbsp; Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
import { getterTypes } from "@/store/modules/auth.js";
//import { mapState } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "AppTopBar",

  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLogged: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous,
    }),

    //     ...mapState({
    //       //currentUser: (state) => state.auth.currentUser,
    //       // isLogged: (state) => state.auth.isLoggedIn,
    //     }),
    // currentUser() {
    //   return this.$store.getters[getterTypes.currentUser];
    // },
    // isLogged() {
    //   return this.$store.getters[getterTypes.isLoggedIn];
    // },
    // isAnonymous() {
    //   return this.$store.getters[getterTypes.isAnonymous];
    // },
  },
};
</script>
