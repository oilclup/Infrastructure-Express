<template>
    <nav aria-label="section-pagination">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="goToPrevious">Previous</a>
        </li>
        <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber"
          :class="{ 'active': pageNumber === currentPage }">
          <a class="page-link" href="#" @click.prevent="goToPage(pageNumber)">{{ pageNumber }}</a>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="goToNext">Next</a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    },
    methods: {
      goToPage(pageNumber) {
        if (pageNumber !== this.currentPage) {
          this.$emit('page-change', pageNumber);
        }
      },
      goToPrevious() {
        if (this.currentPage > 1) {
          this.$emit('page-change', this.currentPage - 1);
        }
      },
      goToNext() {
        if (this.currentPage < this.totalPages) {
          this.$emit('page-change', this.currentPage + 1);
        }
      }
    }
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  