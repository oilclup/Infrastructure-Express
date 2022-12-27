<template>
  <div
    class="modal fade"
    id="bs-example-modal-xl"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myExtraLargeModalLabel"
    aria-hidden="true"
    ref="centerModal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="myExtraLargeModalLabel">Thai Fighter</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <Search
            :types="search_types"
            @onSearch="onSearch($event)"
            class="search-padding"
          />
          <div class="table-responsive">
            <table class="table table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col" class="tf-2">#</th>
                  <th scope="col" class="tf-2">Photo</th>
                  <th scope="col" class="tf-3-5">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(x, idx) in data.data"
                  :key="x.id"
                  class="pointer"
                  v-bind:class="{ 'table-selected': x.checked }"
                  @click="holdData(x, idx)"
                  @dblclick="selectData"
                >
                  <th scope="row">{{ idx + 1 }}</th>
                  <td>
                    <img
                      style="max-width:170px;height:120px;"
                      :src="`${baseImageUrl}/${x.fighter_image}`"
                      alt
                      class="img-fluid"
                    />
                  </td>
                  <td style="width:50%">{{ x.fighter_name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <Pagination
            class="pull-left"
            :data="data"
            :page="page"
            @onPage="onPage($event)"
            v-show="data.total > 1"
          />
          <button type="button" class="btn btn-primary" v-on:click="selectData"
            >Select</button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import Pagination from '@components/base/pagination'
import Search from '@components/base/search'
import { BASE_IMAGE_URL } from '@src/config/configs'

export default {
  components: {
    Pagination,
    Search,
  },
  data() {
    return {
      baseImageUrl: BASE_IMAGE_URL,
      data: [],
      page: 1,
      search_types: [{ key: 'fighter_name', value: 'Fighter Name' }],
      search: {},
      select: {},
      sort_type: 'asc',
      sort_key: '',
    }
  },
  methods: {
    openModal() {
      $(this.$refs.centerModal).modal('show')
      this.loadData()
    },
    closeModal() {
      $(this.$refs.centerModal).modal('hide')
    },
    onPage(page) {
      this.page = page
      this.loadData()
    },
    onSearch(search) {
      this.search = search
      this.page = 1
      this.loadData()
    },
    onSort(key) {
      if (this.sort_key != key) {
        this.sort_type = 'asc'
      } else {
        this.sort_type = this.sort_type == 'asc' ? 'desc' : 'asc'
      }
      this.sort_key = key
      this.loadData()
    },
    async loadData() {
      await axios('/api/fighter/pagination', {
        params: {
          page: this.page,
          ...this.search,
          orderByField: this.sort_key || 'createdAt',
          orderBy: this.sort_type,
        },
      }).then((resp) => {
        let data = resp.data
        data.data.forEach((f) => {
          f.checked = false
        })
        this.$set(this, 'data', data)
      })
    },
    holdData(x, idx) {
      this.$helpers.isSelected(this.data.data, idx)
      this.select = x
    },
    selectData() {
      this.$emit('send-data', this.select)
      this.closeModal()
    },
  },
}
</script>

<style scoped>
.search-padding {
  padding-bottom: 1rem !important;
}
</style>
