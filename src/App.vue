<template>
  <div>
    <appTopBar />
   
   
    <router-view />
  </div>
</template>

<script>
import AppTopBar from "@/components/TopBar.vue";
import { actionTypes } from "@/store/modules/auth.js";
export default {
  name: "MainApp",
  components: {
    AppTopBar,
  },

  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>
