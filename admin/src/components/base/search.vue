<template>
  <b-form
    class="form-horizontal form-style-search"
    @submit.prevent="onSearch()"
  >
    <slot></slot>
    <select class="form-control" v-model="form.search_key" @change="onChange()">
      <option v-for="x in types" :key="x.key" :value="x.key"
        >Search from: {{ x.value }}</option
      >
    </select>

    <div class="group-from">
      <input
        type="text"
        class="form-control"
        v-model.trim="form.search_text"
        placeholder="Search..."
      />
      <button type="submit" class="btn btn-secondary">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </b-form>
</template>

<script>
export default {
  props: {
    types: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: {
        search_key: '',
        search_text: '',
      },
    }
  },
  mounted() {
    if (this.types && this.types.length > 0) {
      this.form.search_key = this.types[0].key
    }
  },
  methods: {
    onSearch() {
      const key = this.form.search_key
      const value = this.form.search_text
      let form = {
        [key]: value,
      }
      this.$emit('onSearch', form)
    },
    onChange() {
      // this.$emit('onChange', this.form)
    },
  },
}
</script>

<style scoped>
.search-form {
  float: right;
  margin-bottom: 15px;
}
.form-control {
  margin-right: 5px;
}
.form-control:first-child {
  width: 250px;
}
.form-control:nth-child(2) {
  width: 250px;
}

@media (max-width: 575.98px) {
  .form-control {
    margin-right: 0;
  }
  .form-control:first-child {
    width: 100%;
    margin-bottom: 3px;
  }
  .form-control:nth-child(2) {
    width: 80%;
  }
  button {
    margin-left: 1%;
    width: 19%;
  }
  .form-style-search {
    width: 100%;
    flex-wrap: wrap;
  }
}
</style>
