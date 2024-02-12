<template>
    <nav class="section-header mb-3">
      <div class="row">
        <div class="col-md-2">
          <div class="row align-items-center">
            <div class="col-auto">
              <p class="mb-0">show</p>
            </div>
            <div class="col-auto">
              <select class="form-select" v-model="localPageLimit" @change="onLimitChange">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-8"></div>
        <div class="col-md-2">
          <div class="input-group">
            <input v-model="localSearchData" type="text" class="form-control">
            <button @click="onSearch" class="input-group-text"><i class="fas fa-search"></i></button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      // your props here
    },
    data() {
      return {
        localPageLimit: "10",
        localSearchData: ""
      };
    },
    watch: {
      localPageLimit(newValue) {
        this.onLimitChange(newValue);
      },
      localSearchData(newValue) {
        this.$emit('search', newValue);
      }
    },
    methods: {
      onSearch() {
        this.$emit('search', this.localSearchData);
      },
      onLimitChange() {
        this.$emit('limit-change', parseInt(this.localPageLimit));
      }
    }
  };
  </script>
  