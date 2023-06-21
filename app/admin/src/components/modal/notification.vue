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
          <h5 class="modal-title" id="myExtraLargeModalLabel"></h5>

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
          <div class="d-flex">
            <b-tabs content-class="mt-3">
              <b-tab
                @click="
                  () => {
                    ;(tabIndex = 0), (active = true), loadData()
                  }
                "
                title="Content"
                :active="active"
              ></b-tab>
              <!-- <b-tab
                @click="
                  () => {
                    ;(tabIndex = 1), (active = false), loadData()
                  }
                "
                title="Course"
                :active="!active"
              ></b-tab> -->
            </b-tabs>

            <div v-if="active">
              <b-form-select
                style="margin-left:10px"
                v-model="selected"
                :options="options"
                @change="loadData()"
              ></b-form-select>
            </div>

            <Search
              :types="search_types"
              @onSearch="onSearch($event)"
              class="search-padding"
            />
          </div>
          <div class="table-responsive">
            <table class="table table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col" class="tf-2">#</th>
                  <th scope="col" class="tf-2"></th>
                  <th scope="col" class="tf-3-5">Title</th>
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
                      :src="
                        `${baseImageUrl}/${x.category_image ||
                          x.img_url ||
                          x.sub_image}`
                      "
                      alt
                      class="img-fluid"
                    />
                    <iframe
                      v-if="!x.sub_image && active && x.video_data"
                      :src="
                        `https://player.vimeo.com/video/${x.video_data.vimeoid}`
                      "
                      width="250"
                      height="150"
                      frameborder="0"
                      allow="  fullscreen"
                      allowfullscreen
                    ></iframe>
                  </td>
                  <td style="width:50%">{{
                    x.category_name || x.content_title || x.sub_name
                  }}</td>
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
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="true"
    ></loading>
  </div>
</template>

<script>
import axios from '@/axios'
import Pagination from '@components/base/pagination'
import Search from '@components/base/search'
import { BASE_IMAGE_URL } from '@src/config/configs'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    Loading,
    Pagination,
    Search,
  },
  data() {
    return {
      isLoading: false,
      baseImageUrl: BASE_IMAGE_URL,
      data: [],
      page: 1,
      search_types: [{ key: 'title', value: 'title' }],
      search: {},
      select: {},
      sort_type: 'asc',
      sort_key: '',
      tabIndex: 0,
      active: true,
      selected: 'free',
      target: 'all',
      options: [
        { value: 'free', text: 'Free' },
        { value: 'muaythainews', text: 'muaythainews' },
        { value: 'exclusivetraining', text: 'exclusivetraining' },
        { value: 'premiummember', text: 'premiummember' },
      ],
      target: true,
      optionsTarget: [
        { value: true, text: 'ALL' },
        { value: false, text: 'MEMBER' },
      ],
    }
  },
  methods: {
    doAjax() {
      this.isLoading = true
    },
    onCancel() {
      this.isLoading = false
    },
    openModal() {
      $(this.$refs.centerModal).modal('show')
      this.tabIndex = 0
      this.active = true
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

    async clickTab() {
      this.loadData()
    },
    async loadData() {
      this.doAjax()
      if (this.tabIndex == 0) {
        await axios
          .get('/api/content/v2/getContentForNotifacation', {
            params: {
              page: this.page,
              type: this.selected,
              ...this.search,
              sort_by: this.sort_by,
              orderByField: 'createdAt',
              orderBy: 'desc',
            },
          })
          .then((resp) => {
            let data = resp.data

            data.data.forEach((f) => {
              f.checked = false
            })
            this.$set(this, 'data', data)
          })
      } else if (this.tabIndex == 1) {
        await axios.get('/api/category').then((resp) => {
          let data = resp
          data.data.forEach((f) => {
            f.checked = false
          })
          this.$set(this, 'data', data)
        })
      }
      this.onCancel()
    },
    holdData(x, idx) {
      this.$helpers.isSelected(this.data.data, idx)
      this.select = x
    },

    async selectSub(x) {
      x.sub_data.forEach((f) => {
        f.checked = false
        f.category_name = x.category_name
      })

      this.$set(this, 'data', x.sub_data)
      this.data.data = x.sub_data
    },
    selectData() {
      if (this.tabIndex == 3) {
        this.$emit('send-data', this.select)
        this.closeModal()
      }
      if (this.tabIndex == 0) {
        this.$emit('send-data', this.select)
        this.closeModal()
      }
      if (this.tabIndex == 1 && this.select.category_code == 'M001') {
        this.$emit('send-data', this.select)
        this.closeModal()
      }
      if (this.tabIndex == 1) {
        this.tabIndex = 3
        this.selectSub(this.select)
      }
    },
  },
}
</script>

<style scoped>
.search-padding {
  padding-bottom: 1rem !important;
}
</style>
