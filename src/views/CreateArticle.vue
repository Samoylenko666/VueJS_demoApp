<template>
  <AppArticleForm
    :initial-values="InitialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import AppArticleForm from "@/components/ArticleForm.vue";
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/createArticle";
export default {
  name: "AppCreateArticle",
  components: {
    AppArticleForm,
  },

  computed: {
    ...mapState({
      isSubmitting: (state) => state.createArticle.isSubmitting,
      validationErrors: (state) => state.createArticle.validationErrors,
    }),
  },
  data() {
    return {
      InitialValues: {
        title: "",
        description: "",
        tagList: [],
        body: "",
      },
    };
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.createArticle, { articleInput })
        .then((article) => {
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
};
</script>
