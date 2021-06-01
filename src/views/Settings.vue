<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <AppValidationErrors
            v-if="validationErrors"
            :propvalidationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="url of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="bio about you"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="password"
                />
              </fieldset>
              <button
                type="submit"
                class="btn-lg btn btn-primary pull-xs-right"
                :disabled="isSubmitting"
              >
                Update Settings
              </button>
            </fieldset>
          </form>

          <hr />

          <button class="btn btn-outline-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import AppValidationErrors from "@/components/ValidationErrors.vue";
import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes,
} from "@/store/modules/auth";
export default {
  name: "AppSettings",
  components: {
    AppValidationErrors,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErrors,
    }),

    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),

    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        image: this.currentUser.image,
        email: this.currentUser.email,
        password: "",
      };
    },
  },

  methods: {
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {
        currentUserInput: this.form,
      });
    },
    logout() {
      this.$store
        .dispatch(authActionTypes.logoutCurrentUser)
        .then(this.$router.push({ name: "globalFeed" }));
    },
  },
};
</script>
