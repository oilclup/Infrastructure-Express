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
          <h5 class="modal-title" id="myExtraLargeModalLabel">Video List</h5>
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
          <div class="table-responsive">
            <table class="table table-striped mb-0">
              <thead>
                <tr>
                  <th class="tf-1-5"></th>
                  <th scope="col" class="tf-2">#</th>
                  <th scope="col" class="tf-2">Thumbnail</th>
                  <th scope="col" class="tf-3-5">Video URL</th>
                  <th scope="col" class="tf-3-5">Video Title</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(x, idx) in data.data"
                  :key="x.id"
                  class="pointer"
                  v-bind:class="{ 'table-selected': x.checked }"
                  @click="holdData(x, idx)"
                >
                  <td>
                    <input type="checkbox" v-model="x.checked" />
                  </td>
                  <th scope="row">{{ idx + 1 }}</th>
                  <!-- <td>
                    <img
                      style="height: 150px; width: 300px; "
                      :src="x.thumnail"
                    />
                  </td> -->

                  <td>
                    <iframe
                      :src="`https://player.vimeo.com/video/${x.vimeoid}`"
                      width="350"
                      height="200"
                      frameborder="0"
                      allow="  fullscreen"
                      allowfullscreen
                    ></iframe>
                  </td>
                  <td>
                    {{ x.url }}
                  </td>
                  <td>
                    {{ x.name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <Pagination
            class=""
            :data="data"
            :page="page"
            @onPage="onPage($event)"
            v-show="data.total > 1"
          />
          <button
            type="button"
            class="btn btn-primary pull-right"
            v-on:click="selectData"
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

export default {
  props: {
    fighter_id: { require: true, type: String },
  },
  components: {
    Pagination,
    Search,
  },
  data() {
    return {
      data: [],
      page: 1,
      search_types: [{ key: '', value: '' }],
      search: {},
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
      await axios(`/api/fighter/video/${this.fighter_id}`, {
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
      x.checked = !x.checked
    },
    selectData() {
      let arr = []
      this.data.data.forEach((x) => {
        if (x.checked) arr.push(x)
      })
      this.$emit('send-data', arr)
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
