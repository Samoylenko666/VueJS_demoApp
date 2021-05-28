<template>
  <div class="home-page">
    <AppBanner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <AppFeedToggler  />
          <AppFeed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <AppPopularTag />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from "@/components/Feed.vue";
import AppPopularTag from "@/components/PopularTag";
import AppBanner from "@/components/Banner.vue";
import AppFeedToggler from "@/components/FeedToggler.vue";
export default {
  name: "AppYourFeed",
  components: {
    AppFeed,
    AppPopularTag,
    AppBanner,
    AppFeedToggler,
  },
  data() {
    return {
      apiUrl: "/articles/feed",
    };
  },
};
</script>
