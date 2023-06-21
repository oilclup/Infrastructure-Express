<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/main'
// import PageHeader from '@components/page-header'
import axios from '@/axios'
import { BASE_IMAGE_URL } from '@src/config/configs'
import Pagination from '@src/components/base/pagination'
import Search from '@src/components/base/search'
/**
 * Contents component
 */
export default {
  page: {
    title: 'Work out',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: {
    Layout,
    Pagination,
    Search,

    //  PageHeader
  },

  props: {
    categoryCode: {
      type: String,
    },
    subData: {
      type: String,
    },
  },
  data() {
    return {
      baseImageUrl: BASE_IMAGE_URL,
      search_types: [{ key: 'sub_title', value: 'Title' }],
      sortByList: [{ key: 'Title', value: 'sub_title' }],
      search: {},
      dataSubcatagory: [],
      search: {},
      page: 1,
      data: [],
      pagination: {},
      sort_by: '',
    }
  },
  mounted() {
    this.onLode()
    // this.dataSubcatagory = this.sub_data
  },
  methods: {
    async onLode() {
      const result = await axios
        .post(`/api/subcategory/get/getsub`, {
          category_code: this.categoryCode,
        })
        .catch((err) => {
          // alert(err.response.data.message)
        })

      // console.warn(result.data)
      this.dataSubcatagory = result.data.sub_category
    },
    async handleClickEditSub(id) {
      this.$router.push({
        path: `/category/child/create/${this.categoryCode}`,
        query: { id: id._id },
      })
    },
    async handleClickDeleteSub(targetSubcategory) {
      var confirmDel = confirm('Are you sure you want to delete?')
      if (confirmDel) {
        await axios
          .delete(
            `/api/subcategory/delete/getsub/${targetSubcategory._id}?category_code=${this.categoryCode}
          `
          )
          .then((result) => {
            this.onLode()
          })
          .catch((err) => {
            alert(err.response.data.error.message)
          })
      }
    },
  },
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <Search :types="search_types" @onSearch="onSearch($event)">
        <div class="input-group" style="margin-right:5px">
          <div class="input-group-prepend">
            <label class="input-group-text">Sort by:</label>
          </div>
          <select v-model="sort_by" class="custom-select" @change="onLoad">
            <option value>All</option>
            <option v-for="x in sortByList" :key="x.key" :value="x.value">{{
              x.key
            }}</option>
          </select>
        </div>
      </Search>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table mb-0">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <!-- <th scope="col">Image</th> -->
              <th scope="col">Title</th>
              <!-- <th scope="col">Price</th> -->

              <!-- <th scope="col">Status</th> -->
              <th scope="col" class="thcenter">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataSubcatagory" :key="index">
              <td scope="row">{{ ++index }}</td>

              <td>{{ item.name }}</td>

              <td class="d-flex justify-content-center">
                <router-link
                  :to="`/category/child/${categoryCode}/subinsub/${item._id}`"
                >
                  <button class="btn btn-info p-0 px-2 py-1 mr-2">View</button>
                </router-link>
                <button
                  class="btn btn-warning p-0 px-2 py-1 mr-2"
                  @click="handleClickEditSub(item)"
                  >Edit</button
                >

                <b-button
                  v-b-modal.modal-center
                  class="btn btn-danger p-0 px-2 py-1"
                  @click="handleClickDeleteSub(item)"
                  >Delete</b-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination :data="pagination" :page="page" @onPage="onPage($event)" />
    </div>
  </div>
</template>
