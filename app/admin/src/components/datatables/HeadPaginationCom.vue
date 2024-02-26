<template>
  <div class="row">
    <div class="col-md-2">
      <div class="row align-items-center">
        <div class="col-auto">
          <p class="mb-0">show</p>
        </div>
        <div class="col-auto">
          <select class="form-select" v-model="paginationLimit" @change="emitLimitChange">
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
        <input v-model="inputText" type="text" class="form-control">
        <button @click="emitSearch" class="input-group-text"><i class="fas fa-search"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentLimit: {
      type: Number,
      required: true
    },
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      paginationLimit: this.currentLimit,
      inputText: this.searchText
    };
  },
  methods: {
    emitLimitChange() {
      this.$emit('update:currentLimit', parseInt(this.paginationLimit));
    },
    emitSearch() {
      this.$emit('update:searchText', this.inputText);
    }
  }
};
</script>

<style scoped></style>
