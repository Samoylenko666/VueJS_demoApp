<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOpt,
      'btn-outline-primary': !isFavoritedOpt,
    }"
  >
    <i class="ion-heart" />

    <span> &nbsp;{{ favoritesCountOpt }}</span>
  </button>
</template>

<script>
import { actionTypes } from "@/store/modules/addToFavorites";

export default {
  name: "AppAddToFavorites",
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isFavoritedOpt: this.isFavorited,
      favoritesCountOpt: this.favoritesCount,
    };
  },
  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOpt,
      });
      if (this.isFavoritedOpt) {
        this.favoritesCountOpt = this.favoritesCountOpt - 1;
      } else {
        this.favoritesCountOpt = this.favoritesCountOpt + 1;
      }

      this.isFavoritedOpt = !this.isFavoritedOpt;
    },
  },
};
</script>
