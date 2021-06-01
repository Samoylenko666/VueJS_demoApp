<template>
  <div>
    <AppLoading v-if="isLoading" />
    <AppArticleForm
      v-if="InitialValues"
      :initial-values="InitialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import AppArticleForm from "@/components/ArticleForm.vue";
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/editArticle";
import AppLoading from "@/components/Loading.vue";
export default {
  name: "AppEditArticle",
  components: {
    AppArticleForm,
    AppLoading,
  },

  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validationErrors: (state) => state.editArticle.validationErrors,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
    }),
    InitialValues() {
      if (!this.article) {
        return null;
      }

      return {
        title: this.article.title,
        description: this.article.description,
        tagList: this.article.tagList,
        body: this.article.body,
      };
    },
  },
 
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug;
      this.$store
        .dispatch(actionTypes.editArticle, { slug, articleInput })
        .then((article) => {
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
};
</script>
