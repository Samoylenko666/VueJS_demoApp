<template>
  <div>Register page</div>

  <div class="auth-page">
    <div class="container Page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Sign In
          </h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>

          <AppValidationErrors
            v-if="validationErrors"
            :propvalidationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="password"
                v-model="password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="varIsSubmitting"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from "@/components/ValidationErrors.vue";
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/auth.js";
export default {
  name: "AppLogin",
  components: {
    AppValidationErrors,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
      ...mapState({
          varIsSubmmiting: state=> state.auth.isSubmmiting,
             validationErrors: state=> state.auth.validationErrors,
      })


//     varIsSubmitting() {
//       return this.$store.state.auth.isSubmitting;
//     },
//     validationErrors() {
//       return this.$store.state.auth.validationErrors;
//     },
   },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "globalFeed" });
        });
    },
  },
};
</script>
