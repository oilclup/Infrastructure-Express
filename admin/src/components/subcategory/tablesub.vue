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
    category_code: {
      type: String,
    },
    sub_data: {
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
      dataCategory: {},
    }
  },
  mounted() {
    this.onLode()

    // this.dataSubcatagory = this.sub_data
  },
  methods: {
    async onLode() {
      // console.log(this.category_code)
      const result = await axios
        .get(`/api/category/${this.category_code}`)
        .catch((err) => {
          alert(err.response.data.message)
        })

      this.dataSubcatagory = result.data
    },
    async handleClickEditSub(id) {
      this.$router.push({
        path: `/category/child/create/${this.$route.params.id}`,
        query: { id: id._id },
      })
    },
    async handleClickDeleteSub(targetSubcategory) {
      var confirmDel = confirm('Are you sure you want to delete?')
      if (confirmDel) {
        await axios
          .delete(`/api/subcategory/${targetSubcategory._id}`)
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
          <select class="custom-select" v-model="sort_by" @change="onLoad()">
            <option value>All</option>
            <option v-for="x in sortByList" :key="x.key" :value="x.value">
              {{ x.key }}
            </option>
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
              <th scope="col">Product ID</th>
              <th scope="col" v-if="dataSubcatagory.is_tag">Tag</th>
              <th scope="col" v-if="dataSubcatagory.is_tag">Fighter Name</th>

              <!-- <th
                scope="col"
                v-if="
                  !dataSubcatagory.is_fighter ||
                    dataSubcatagory.is_fighter == false
                "
              ></th>
              <th
                scope="col"
                v-if="
                  !dataSubcatagory.is_fighter ||
                    dataSubcatagory.is_fighter == true
                "
              ></th>-->
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataSubcatagory.sub_data" :key="index">
              <td scope="row">{{ ++index }}</td>

              <td style="width: 15%">
                <img
                  style="height: 150px; width: 300px; "
                  :src="`${baseImageUrl}/${item.sub_image}`"
                />
              </td>
              <td>{{ item.sub_name }}</td>
              <td>{{ item.sub_price }}</td>
              <td>{{ item.iapProductId }}</td>

              <td v-if="dataSubcatagory.is_tag">{{
                item.tag_data ? item.tag_data.tag_name : ' '
              }}</td>
              <td v-if="dataSubcatagory.is_tag">{{
                item.fighter_name ? item.fighter_name.fighter_name : ' '
              }}</td>

              <!-- <td
                v-if="
                  !dataSubcatagory.is_fighter ||
                    dataSubcatagory.is_fighter == false
                "
              >
                <router-link :to="`/category/child/sub/${item._id}`"
                  >Add Video</router-link
                >
              </td>
              <td
                v-if="
                  !dataSubcatagory.is_fighter ||
                    dataSubcatagory.is_fighter == true
                "
              >
                <router-link :to="`/category/child/sub/${item._id}`"
                  >Add Fighter</router-link
                >
              </td>-->
              <td>
                <b-badge v-if="item.is_coming" variant="secondary"
                  >Hide</b-badge
                >
                <b-badge v-else variant="primary">Show</b-badge>
              </td>

              <td class="d-flex">
                <router-link :to="`/category/child/sub/${item._id}`">
                  <button class="btn btn-info p-0 px-2 py-1 mr-2">View</button>
                </router-link>
                <button
                  class="btn btn-warning p-0 px-2 py-1 mr-2"
                  @click="handleClickEditSub(item)"
                  >Edit</button
                >

                <b-button
                  @click="handleClickDeleteSub(item)"
                  class="btn btn-danger p-0 px-2 py-1"
                  v-b-modal.modal-center
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
