<template>
  <nav aria-label="Page navigation example" v-show="data.total > 0">
    <paginate
      :page-count="data.totalPages || 0"
      :margin-pages="2"
      :page-range="3"
      :click-handler="onPage"
      :container-class="'pagination justify-content-end'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-text="'&#10094;'"
      :prev-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-text="'&#10095;'"
      :next-class="'page-item'"
      :next-link-class="'page-link'"
      :break-view-class="'break-view'"
      :break-view-link-class="'break-view-link'"
      :first-last-button="true"
      first-button-text="First"
      last-button-text="Last"
    ></paginate>
  </nav>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
    },
    page: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  computed: {
    getPageItems() {
      const pages = []
      if (this.data) {
        if (this.data.total && this.data.perPage) {
          const rows = this.data.total
          const limit = this.data.perPage
          for (let index = 1; index <= Math.ceil(rows / limit); index++) {
            pages.push(index)
          }
        }
      }
      return pages
    },
  },
  methods: {
    onPage(page) {
      this.$emit('onPage', page)
    },
  },
}
</script>

<style scoped>
.pagination {
  flex-wrap: wrap;
}
.page-item {
}
.page-link-item {
}
.prev-item {
}
.prev-link-item {
}
.next-item {
}
.next-link-item {
}
.break-view {
}
.break-view-item {
}
</style>
