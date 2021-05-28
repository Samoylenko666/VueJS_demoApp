<template>
  <ul class="pagination">
    <li v-for="page in pages" :key="page" class="page-item" :class="{active: currentPage === page}">
      <router-link :to="{ path: url, query: { page: page } }" class="page-link">
        {{ page}} 
      </router-link>
    </li>
  </ul>
</template>

<script>
import { range } from "@/helpers/utils.js";
export default {
  name: "AppPagination",

  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      required: true,
      type: Number,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    url: {
      required: true,
      type: String,
    },
  },
  computed: {
    pages() {
      const pagesCount = Math.ceil(this.total / this.limit);

      return range(1, pagesCount);
    },
  },
};
</script>
