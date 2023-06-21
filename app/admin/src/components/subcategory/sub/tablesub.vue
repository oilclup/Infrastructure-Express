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
      dataSubcatagory: '',
      search: {},
      page: 1,
      data: [],
      pagination: {},
      sort_by: '',
      child: '',
      idheadsub: '',
    }
  },
  mounted() {
    this.onLode()
    this.child = this.$route.params.child
    this.idheadsub = this.$route.params.id
    // this.dataSubcatagory = this.sub_data
  },
  methods: {
    async onLode() {
      await axios
        .get(`/api/subcategory/get/getsub/${this.$route.params.id}`)
        .then((res) => {
          this.data = res.data
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    async handleClickEditSub(id) {
      this.$router.push({
        path: `/category/child/${this.child}/subinsub/${this.idheadsub}/create/${id._id}`,
        // query: { obj: id },
      })
    },
    async handleClickDeleteSub(targetSubcategory) {
      var confirmDel = confirm('Are you sure you want to delete?')
      if (confirmDel) {
        await axios
          .delete(
            `/api/subcategory/delete/subinsub/${targetSubcategory._id}?sub_id=${this.idheadsub}`
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
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
              <!-- <th scope="col">Status</th> -->
              <th scope="col" class="thcenter">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.sub_data" :key="index">
              <td scope="row">{{ ++index }}</td>

              <td style="width: 15%">
                <img
                  style="height: 150px; width: 300px; "
                  :src="`${baseImageUrl}/${item.sub_image}`"
                />
              </td>
              <td>{{ item.sub_name }}</td>
              <td>{{ item.sub_price }}</td>
              <td>
                <router-link
                  :to="`/category/child/sub/subsubcategory/${item._id}`"
                  >Add Video</router-link
                >
                <!-- <router-link
                  :to="
                    `/category/child/${child}/subinsub/${idheadsub}/create/${item._id}`
                  "
                  >Add Video</router-link
                > -->
              </td>

              <!-- <td>
                <div v-if="item.iscomingsoon">comingsoon</div>
                <div v-else>active</div>
              </td> -->

              <td class="d-flex">
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
