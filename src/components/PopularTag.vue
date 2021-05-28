<template>
  <AppLoading v-if="isLoading" />

  <AppErrorMessage v-if="error" />
  <div class="sidebar" v-if="popularTags">
    <p>Popular Tag</p>
    <div class="tag-list">
      <router-link
        v-for="popularTag in popularTags"
        :key="popularTag"
        :to="{ name: 'tag', params: { slug: popularTag } }"
        class="tag-default tag-pill"
      >
        {{ popularTag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/popularTag.js";
import AppLoading from "@/components/Loading.vue";
import AppErrorMessage from "@/components/ErrorMessage.vue";
export default {
  name: "AppPopularTag",
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTag.isLoading,
      error: (state) => state.popularTag.error,
      popularTags: (state) => state.popularTag.data,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTag);
  },
  components: {
    AppLoading,
    AppErrorMessage,
  },
};
</script>
