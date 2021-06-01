<template>
  <div>
    <AppLoading v-if="isLoading" />

    <AppErrorMessage v-if="errors" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date"> {{ article.createdAt }}</span>
          </div>

          <div class="pull-xs-right">
            <AppAddToFavorites
              :isFavorited="article.favorited"
              :articleSlug="article.slug"
              :favoritesCount="article.favoritesCount"
            />
          </div>
        </div>

        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span> Read more..</span>
          <AppTagList :tags="article.tagList" />
        </router-link>
      </div>

      <AppPagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/feed.js";
import { mapState } from "vuex";
import { limit } from "@/helpers/vars.js";
import AppPagination from "@/components/Pagination";
import { stringify, parseUrl } from "query-string";
import AppLoading from "@/components/Loading.vue";
import AppTagList from "@/components/TagList.vue";
import AppErrorMessage from "@/components/ErrorMessage.vue";
import AppAddToFavorites from "@/components/AddToFavorites.vue";
export default {
  name: "AppFeed",
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  components: {
    AppPagination,
    AppLoading,
    AppErrorMessage,
    AppTagList,
    AppAddToFavorites,
  },
  data() {
    return {
      limit,
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      errors: (state) => state.feed.errors,
    }),
    currentPage() {
      return Number(this.$route.query.page || "1");
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
    apiUrl() {
      this.fetchFeed();
    },
  },
  mounted() {
    this.fetchFeed();
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParam = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParam = `${parsedUrl.url}?${stringifiedParam}`;

      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParam });
    },
  },
};
</script>
